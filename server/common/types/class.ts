export type Faculty = {
  id: string;
  name: string;
  departments: Department[];
  createdAt: number;
  Syllabus: Syllabus[];
};

export type Department = {
  id: string;
  name: string;
  facultyId: string;
  faculty: Faculty;
  syllabi: Syllabus[];
};

export type Syllabus = {
  id: string;
  courseName: string;
  instructor: string;
  semester: string;
  period: string;
  conduction: string;
  yearOfStudy: string;
  language: string;
  facultyId: string;
  departmentId: string;
  faculty: Faculty;
  department: Department;
  createdAt: Date;
};

export type ScrapedSyllabusData = {
  courseName: string;
  instructor: string;
  semester: string;
  period: string;
  conduction: string;
  yearOfStudy: string;
  language: string;
  facultyName: string;
  departmentName: string;
  classUrl: string;
};

export type RealData = {
  id: string;
  courseName: string;
  instructor: string;
  semester: string;
  period: string;
  conduction: string;
  yearOfStudy: string;
  language: string;
  facultyId: string;
  departmentId: string;
  createdAt: Date;
};
