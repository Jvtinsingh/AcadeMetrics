// ===== MSI BCA VI (2023-2026) — Real Institutional Data =====

const STUDENTS_RAW = [
  ['Divyansh Malik','00121202023','A'],['Sourav Banerjee','00221202023','A'],
  ['Mohd Zaid','00321202023','A'],['Piyush Gupta','00421202023','A'],
  ['Krish','00521202023','A'],['Paridhi Aggarwal','00621202023','A'],
  ['Aumeesh Dhand','00821202023','A'],['Ishita Sharma','00921202023','A'],
  ['Kirtiraj Singh Kanwer','01021202023','A'],['Gaurav Jaiswal','01221202023','A'],
  ['Monica Sharma','01321202023','A'],['Adarsh Tiwari','01421202023','A'],
  ['Nikkush Singh','01521202023','A'],['Ayush Saini','01621202023','A'],
  ['Harsh Gupta','01721202023','A'],['Hardik','01821202023','A'],
  ['Dhruv Rawat','01921202023','A'],['Bhavuk Vinayak','02021202023','A'],
  ['Ajay Dhyani','02121202023','A'],['Mohit Mahara','02221202023','A'],
  ['Krishna Negi','02321202023','A'],['Dev Kumar','02421202023','A'],
  ['Achal Singh Bisht','02521202023','A'],['Deepanshu Yadav','02621202023','A'],
  ['Afifa Hashmi','02721202023','A'],['Hardik Bhardwaj','02821202023','A'],
  ['Muskaan Alag','02921202023','A'],['Aditya Kumar','03021202023','A'],
  ['Yatharth','03121202023','A'],['Shagun Verma','03221202023','A'],
  ['Devansh Verma','03321202023','A'],['Shaurya M. Chowdhary','03421202023','A'],
  ['Moksh Yadav','03521202023','A'],['Yash Dev','03621202023','A'],
  ['Abhay','03721202023','A'],['Priyanka Gaba','03821202023','A'],
  ['Vishal','03921202023','A'],['Aayushman Chulet','04021202023','A'],
  ['Aditya Pundir','04121202023','A'],['Dhruv','04221202023','A'],
  ['Sameer Sehrawat','04321202023','A'],['Vishesh Sharma','04421202023','A'],
  ['Ayush','04521202023','A'],['Anjli Sharma','04621202023','A'],
  ['Bhuvan Asija','04721202023','A'],['Avneet Singh','04821202023','A'],
  ['Shalini','04921202023','A'],['Madhur Chawla','05021202023','A'],
  ['Gurpreet Singh','05121202023','A'],['Janhvi','05221202023','A'],
  ['Kimpreet Kaur','05321202023','A'],['Aditya Chowhan','05421202023','A'],
  ['Hardik Malik','35121202023','A'],['Mohd. Tahsin','35221202023','A'],
  ['Kartik Goel','35321202023','A'],['Komal','35421202023','A'],
  ['Vaibhavi Mendiratta','35521202023','A'],['Bhumika','35621202023','A'],
  // Section B
  ['Arman','05521202023','B'],['Ravikant Jangir','05621202023','B'],
  ['Aryan Chawla','05721202023','B'],['Rakshit Gautam','05821202023','B'],
  ['Vatsala Kaushik','05921202023','B'],['Yugal Kukreja','06021202023','B'],
  ['Divyam Manchanda','06121202023','B'],['Mansi Saxena','06221202023','B'],
  ['Sneha R. Manchal','06321202023','B'],['Aarish Ahmad','06421202023','B'],
  ['Muskan Sharma','06521202023','B'],['Sanket Das','06621202023','B'],
  ['Himanshi Choudhary','06721202023','B'],['Sambhav Malhotra','06821202023','B'],
  ['Tanush Gupta','06921202023','B'],['Jatin Sisodiya','07021202023','B'],
  ['Tavishi Kamra','07121202023','B'],['Vanshika Sharma','07321202023','B'],
  ['Japneet Kaur','07421202023','B'],['Khushi Kohli','07521202023','B'],
  ['Uday Rathor','07621202023','B'],['Ayush Tyagi','07721202023','B'],
  ['Jatin Garg','07821202023','B'],['Yash','07921202023','B'],
  ['Jatin Singh','08021202023','B'],['Fawaz Khan','08121202023','B'],
  ['Vasu Behl','08221202023','B'],['Rolika Pathania','08321202023','B'],
  ['Anil Sharma','08421202023','B'],['Aashima','08521202023','B'],
  ['Riya Joshi','08621202023','B'],['Deepak Patel','08721202023','B'],
  ['Shubham Kumar','08821202023','B'],['Saksham Mittal','08921202023','B'],
  ['Pratham Sachdeva','09021202023','B'],['Shivam','09221202023','B'],
  ['Nakul','09321202023','B'],['Nirupam Singh','09421202023','B'],
  ['Ritham Gupta','09521202023','B'],['Shaurya Patwal','09621202023','B'],
  ['Alekh Bhardwaj','09721202023','B'],['Mayank','09821202023','B'],
  ['Vishu Nawariya','09921202023','B'],['Ravi Raman','10021202023','B'],
  ['Veeral Narang','10121202023','B'],['Aditya Sharma','10221202023','B'],
  ['Dhruv Dutt','10321202023','B'],['Harsh Solanki','10421202023','B'],
  ['Dhruv','10521202023','B'],['Vanshaj Malik','10621202023','B'],
  ['Ayush Pal','10721202023','B'],['Priyanshi Kunte','10821202023','B'],
  ['Aditi Wadhwa','35721202023','B'],['Khushi Rattan Paul','35821202023','B'],
  ['Tushita Saini','35921202023','B'],['Sanya Wadhwa','36021202023','B'],
  ['Bhavyam Madan','36121202023','B'],['Sanshi Jain','36221202023','B'],
  ['Shashank Laleria','09021202022','B'],
];

const FACULTY_RAW = [
  ['Dr. Anamika Rana','HoD, BCA(E)'],
  ['Dr. Sonam Kaushik','BCA Coordinator'],
  ['Dr. Sushma Malik','Associate Professor'],
  ['Dr. Dimpy Sachar','Associate Professor'],
  ['Dr. Nikita Malik','Assistant Professor'],
  ['Ms. Usha Chhillar','Assistant Professor'],
  ['Ms. Minal Dhankar','Assistant Professor'],
  ['Mr. Suraj Pal Chauhan','Assistant Professor'],
  ['Mr. Harjender Singh','Assistant Professor'],
  ['Mr. Manpreet Singh','Assistant Professor'],
  ['Ms. Kanika Kundu','Assistant Professor'],
];

// Helper to generate email from name
function toEmail(name: string, domain = 'msi.edu.in'): string {
  return name.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z.]/g, '') + '@' + domain;
}

// ===== Build MOCK_USERS (keyed by email for auth lookup) =====
export const MOCK_USERS: Record<string, any> = {
  // System Administrator
  'admin@academetrics.edu': {
    uid: 'admin-001', email: 'admin@academetrics.edu', role: 'admin',
    displayName: 'Dr. Anamika Rana', status: 'active',
    designation: 'HoD, BCA(E)', joinedDate: '2018-07-01',
  },
};

// Add faculty
FACULTY_RAW.forEach(([name, designation], i) => {
  const email = toEmail(name);
  MOCK_USERS[email] = {
    uid: `faculty-${String(i + 1).padStart(3, '0')}`,
    email, role: 'faculty', displayName: name, status: 'active',
    designation, joinedDate: '2020-08-01',
  };
});

// Add students
STUDENTS_RAW.forEach(([name, enrollment, section], i) => {
  const email = `${(enrollment as string).toLowerCase()}@msi.edu.in`;
  MOCK_USERS[email] = {
    uid: `student-${enrollment}`,
    email, role: 'student', displayName: name, status: 'active',
    enrollment, section, joinedDate: '2023-08-01',
  };
});

// Demo login aliases (for @academetrics.edu quick login)
MOCK_USERS['faculty@academetrics.edu'] = {
  uid: 'faculty-009', email: 'faculty@academetrics.edu', role: 'faculty',
  displayName: 'Mr. Harjender Singh', status: 'active',
  designation: 'Assistant Professor', joinedDate: '2020-08-01',
};
MOCK_USERS['student@academetrics.edu'] = {
  uid: 'student-08021202023', email: 'student@academetrics.edu', role: 'student',
  displayName: 'Jatin Singh', status: 'active',
  enrollment: '08021202023', section: 'B', joinedDate: '2023-08-01',
};

// ===== BCA Semester VI Subjects =====
export const MOCK_COURSES = [
  { id: 'sub-1', name: 'Cloud Computing', code: 'BCA301', credits: 4, students: 117, status: 'Active', facultyId: 'faculty-003' },
  { id: 'sub-2', name: 'Machine Learning', code: 'BCA302', credits: 4, students: 117, status: 'Active', facultyId: 'faculty-004' },
  { id: 'sub-3', name: 'Cyber Security', code: 'BCA303', credits: 4, students: 117, status: 'Active', facultyId: 'faculty-005' },
  { id: 'sub-4', name: 'Internet of Things', code: 'BCA304', credits: 4, students: 117, status: 'Active', facultyId: 'faculty-006' },
  { id: 'sub-5', name: 'Software Testing', code: 'BCA305', credits: 4, students: 117, status: 'Active', facultyId: 'faculty-008' },
  { id: 'sub-6', name: 'Web Technologies Lab', code: 'BCA306', credits: 2, students: 117, status: 'Active', facultyId: 'faculty-009' },
  { id: 'sub-7', name: 'Project Lab', code: 'BCA307', credits: 2, students: 117, status: 'Active', facultyId: 'faculty-010' },
  { id: 'sub-8', name: 'Major Project', code: 'BCA308', credits: 4, students: 117, status: 'Active', facultyId: 'faculty-001' },
];

// ===== Semesters =====
export const MOCK_SEMESTERS = [
  { id: 'sem-1', name: 'Semester I (2023-24)', startDate: '2023-08-01', endDate: '2023-12-15', status: 'completed' },
  { id: 'sem-2', name: 'Semester II (2023-24)', startDate: '2024-01-15', endDate: '2024-05-30', status: 'completed' },
  { id: 'sem-3', name: 'Semester III (2024-25)', startDate: '2024-08-01', endDate: '2024-12-15', status: 'completed' },
  { id: 'sem-4', name: 'Semester IV (2024-25)', startDate: '2025-01-15', endDate: '2025-05-30', status: 'completed' },
  { id: 'sem-5', name: 'Semester V (2025-26)', startDate: '2025-08-01', endDate: '2025-12-15', status: 'completed' },
  { id: 'sem-6', name: 'Semester VI (2025-26)', startDate: '2026-01-15', endDate: '2026-05-30', status: 'ongoing' },
];

// ===== Sections =====
export const MOCK_SECTIONS = [
  { id: 'sec-A', name: 'BCA VI - Section A', capacity: 60, enrolled: STUDENTS_RAW.filter(s => s[2] === 'A').length, status: 'active' },
  { id: 'sec-B', name: 'BCA VI - Section B', capacity: 65, enrolled: STUDENTS_RAW.filter(s => s[2] === 'B').length, status: 'active' },
];

// ===== Stats =====
export const MOCK_STATS = {
  totalStudents: STUDENTS_RAW.length,
  activeExams: 8,
  avgScore: 72.4,
  passingRate: 89,
};
