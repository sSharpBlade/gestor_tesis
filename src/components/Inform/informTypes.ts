// src/interfaces.ts

export interface Student {
  career: string;
  name: string;
  issue: string;
  approvalDate: string;
  idThesis: number;
}

export interface Inform {
  signedAt: string;
  date: string;
  percentage: number;
  title: string;
  idThesis: number;
}

export interface LocationState {
  student: Student;
}
