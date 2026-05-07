import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword as firebaseSignIn, 
  createUserWithEmailAndPassword as firebaseCreateUser,
  onAuthStateChanged as firebaseOnAuth,
  signOut as firebaseSignOut,
  GoogleAuthProvider as FirebaseGoogleProvider,
  signInWithPopup as firebasePopup
} from 'firebase/auth';
import { 
  getFirestore, 
  doc as firebaseDoc, 
  getDoc as firebaseGetDoc, 
  setDoc as firebaseSetDoc, 
  collection as firebaseCollection,
  onSnapshot as firebaseSnapshot,
  addDoc as firebaseAddDoc,
  updateDoc as firebaseUpdateDoc,
  deleteDoc as firebaseDeleteDoc,
  getDocs as firebaseGetDocs,
  query as firebaseQuery,
  where as firebaseWhere
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { MOCK_USERS, MOCK_COURSES, MOCK_SEMESTERS, MOCK_SECTIONS } from './mock-data';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'mock-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'mock.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'mock-id',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'mock.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '000',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:000:web:000',
};

const IS_MOCK = process.env.NEXT_PUBLIC_MOCK_MODE === 'true';

// Mock auth state management
let _mockAuthCb: ((user: any) => void) | null = null;
let _mockCurrentUser: any = null;

// Initialize Firebase (Gracefully handle empty config)
let app: any = null;
let auth: any = IS_MOCK ? { 
  currentUser: null,
  onAuthStateChanged: (cb: any) => {
    _mockAuthCb = cb;
    setTimeout(() => cb(_mockCurrentUser), 500);
    return () => { _mockAuthCb = null; };
  },
  signOut: async () => {
    _mockCurrentUser = null;
    if (_mockAuthCb) _mockAuthCb(null);
    console.log('[Mock-Auth] Signed out');
  }
} : null;
let db: any = IS_MOCK ? { appId: 'mock-db' } : null;
let storage: any = {};

if (!IS_MOCK) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    console.log('[Firebase-Client] Live Firebase initialized.');
  } catch (error) {
    console.warn('[Firebase-Client] Initialization failed. Falling back to Mock.');
  }
} else {
  console.log('[Firebase-Client] 🛠️ MOCK MODE ENABLED. Bypassing SDK init.');
}

// Custom Wrappers to Intercept SDK Calls
export const signInWithEmailAndPassword = async (a: any, email: string, p: string) => {
  if (IS_MOCK) {
    console.log('[Mock-Auth] Attempting login for:', email);
    const user = (MOCK_USERS as any)[email];
    if (user) {
      _mockCurrentUser = user;
      if (_mockAuthCb) _mockAuthCb(user);
      return { user };
    }
    throw new Error('Mock authentication failed: User not found in MOCK_USERS');
  }
  return firebaseSignIn(auth, email, p);
};

export const createUserWithEmailAndPassword = async (a: any, email: string, p: string) => {
  if (IS_MOCK) {
    const newUser = { uid: `mock-${Date.now()}`, email };
    _mockCurrentUser = newUser;
    if (_mockAuthCb) _mockAuthCb(newUser);
    return { user: newUser };
  }
  return firebaseCreateUser(auth, email, p);
};

export const onAuthStateChanged = (a: any, cb: any) => {
  if (IS_MOCK) return auth.onAuthStateChanged(cb);
  return firebaseOnAuth(auth, cb);
};

export const signOut = async (a: any) => {
  if (IS_MOCK) return auth.signOut();
  return firebaseSignOut(auth);
};

export const signInWithPopup = async (a: any, p: any) => {
  if (IS_MOCK) {
    const user = (MOCK_USERS as any)['student@academetrics.edu'];
    _mockCurrentUser = user;
    if (_mockAuthCb) _mockAuthCb(user);
    return { user };
  }
  return firebasePopup(auth, p);
};

// --- Mock In-Memory Reactive Firestore ---

// Store: collectionName -> array of docs
const _mockStore: Record<string, any[]> = {};
// Listeners: collectionName -> array of callbacks
const _mockListeners: Record<string, ((snap: any) => void)[]> = {};

// Initialize store with seed data
if (IS_MOCK) {
  _mockStore['users'] = Object.values(MOCK_USERS).map((u: any) => ({ ...u, id: u.uid }));
  _mockStore['subjects'] = [...MOCK_COURSES];
  _mockStore['semesters'] = [...MOCK_SEMESTERS];
  _mockStore['sections'] = [...MOCK_SECTIONS];
  _mockStore['exams'] = [];
  _mockStore['faculty_materials'] = [];
  _mockStore['student_materials'] = [];
  _mockStore['announcements'] = [];
  _mockStore['student_exams'] = [];
  _mockStore['enrollments'] = [];
}

function _getCollection(name: string): any[] {
  if (!_mockStore[name]) _mockStore[name] = [];
  return _mockStore[name];
}

function _buildSnap(collName: string) {
  const data = _getCollection(collName);
  return {
    docs: data.map(d => ({ id: d.id || d.uid, data: () => d })),
    empty: data.length === 0,
  };
}

function _notifyListeners(collName: string) {
  const listeners = _mockListeners[collName] || [];
  const snap = _buildSnap(collName);
  listeners.forEach(cb => cb(snap));
}

// --- Firestore Wrappers ---

export const doc = (d: any, coll: string, id: string) => {
  if (IS_MOCK) return { type: 'mock-doc', coll, id };
  return firebaseDoc(db, coll, id);
};

export const getDoc = async (docRef: any) => {
  if (IS_MOCK && docRef.type === 'mock-doc') {
    const coll = _getCollection(docRef.coll);
    const found = coll.find(d => (d.id || d.uid) === docRef.id);
    if (!found) {
      // Fallback: check MOCK_USERS by uid
      const user = Object.values(MOCK_USERS).find(u => u.uid === docRef.id);
      return { exists: () => !!user, data: () => user || {} };
    }
    return { exists: () => true, data: () => found };
  }
  return firebaseGetDoc(docRef);
};

export const setDoc = async (docRef: any, data: any) => {
  if (IS_MOCK) {
    const coll = _getCollection(docRef.coll);
    const idx = coll.findIndex(d => (d.id || d.uid) === docRef.id);
    const newDoc = { ...data, id: docRef.id };
    if (idx >= 0) { coll[idx] = newDoc; } else { coll.push(newDoc); }
    _notifyListeners(docRef.coll);
    return;
  }
  return firebaseSetDoc(docRef, data);
};

export const collection = (d: any, path: string) => {
  if (IS_MOCK) return { type: 'mock-coll', path };
  return firebaseCollection(db, path);
};

export const onSnapshot = (ref: any, cb: any) => {
  if (IS_MOCK) {
    const collName = ref.path || ref.coll || '';
    console.log('[Mock-DB] Snapshot listener for:', collName);
    
    // Register listener
    if (!_mockListeners[collName]) _mockListeners[collName] = [];
    _mockListeners[collName].push(cb);

    // Send initial data
    setTimeout(() => cb(_buildSnap(collName)), 100);

    // Return unsubscribe
    return () => {
      const listeners = _mockListeners[collName];
      if (listeners) {
        const idx = listeners.indexOf(cb);
        if (idx >= 0) listeners.splice(idx, 1);
      }
    };
  }
  return firebaseSnapshot(ref, cb);
};

export const addDoc = async (collRef: any, data: any) => {
  if (IS_MOCK) {
    const collName = collRef.path || collRef.coll || '';
    const id = `mock-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const newDoc = { ...data, id };
    _getCollection(collName).push(newDoc);
    _notifyListeners(collName);
    console.log('[Mock-DB] Added to', collName, ':', newDoc);
    return { id };
  }
  return firebaseAddDoc(collRef, data);
};

export const updateDoc = async (docRef: any, data: any) => {
  if (IS_MOCK) {
    const coll = _getCollection(docRef.coll);
    const idx = coll.findIndex(d => (d.id || d.uid) === docRef.id);
    if (idx >= 0) {
      coll[idx] = { ...coll[idx], ...data };
      _notifyListeners(docRef.coll);
    }
    console.log('[Mock-DB] Updated doc', docRef.id, ':', data);
    return;
  }
  return firebaseUpdateDoc(docRef, data);
};

export const deleteDoc = async (docRef: any) => {
  if (IS_MOCK) {
    const coll = _getCollection(docRef.coll);
    const idx = coll.findIndex(d => (d.id || d.uid) === docRef.id);
    if (idx >= 0) {
      coll.splice(idx, 1);
      _notifyListeners(docRef.coll);
    }
    console.log('[Mock-DB] Deleted doc', docRef.id);
    return;
  }
  return firebaseDeleteDoc(docRef);
};

export const getDocs = async (ref: any) => {
  if (IS_MOCK) {
    const collName = ref.path || ref.coll || '';
    // Apply query constraints if present
    let data = [..._getCollection(collName)];
    if (ref.constraints) {
      ref.constraints.forEach((c: any) => {
        if (c && c.field && c.op === '==') {
          data = data.filter(d => d[c.field] === c.value);
        }
      });
    }
    return {
      docs: data.map(d => ({ id: d.id || d.uid, data: () => d })),
      empty: data.length === 0,
    };
  }
  return firebaseGetDocs(ref);
};

export const query = (ref: any, ...constraints: any[]) => {
  if (IS_MOCK) return { ...ref, constraints };
  return firebaseQuery(ref, ...constraints);
};

export const where = (field: string, op: string, value: any) => {
  if (IS_MOCK) return { field, op, value };
  return firebaseWhere(field, op as any, value);
};

export const GoogleAuthProvider = IS_MOCK ? class {} : FirebaseGoogleProvider;

export { auth, db, storage };
