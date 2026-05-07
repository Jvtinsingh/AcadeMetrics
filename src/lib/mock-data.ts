export const MOCK_USERS = {
  'admin@academetrics.edu': {
    uid: 'mock-admin-uid',
    email: 'admin@academetrics.edu',
    role: 'admin',
    displayName: 'System Administrator',
    status: 'active',
  },
  'faculty@academetrics.edu': {
    uid: 'mock-faculty-uid',
    email: 'faculty@academetrics.edu',
    role: 'faculty',
    displayName: 'Dr. Sarah Smith',
    status: 'active',
  },
  'student@academetrics.edu': {
    uid: 'mock-student-uid',
    email: 'student@academetrics.edu',
    role: 'student',
    displayName: 'John Doe',
    status: 'active',
  },
};

export const MOCK_COURSES = [
  { id: '1', name: 'Introduction to Computer Science', code: 'CS101', students: 120, status: 'Active' },
  { id: '2', name: 'Advanced Mathematics', code: 'MATH301', students: 45, status: 'Active' },
  { id: '3', name: 'Digital Marketing Essentials', code: 'MKT202', students: 85, status: 'Archived' },
];

export const MOCK_STATS = {
  totalStudents: 1240,
  activeExams: 12,
  avgScore: 78.5,
  passingRate: 92,
};
