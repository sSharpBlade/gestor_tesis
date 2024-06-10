// src/interfaces.ts

import { ReportType } from "../Modal/reportType";

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
  isEditing : boolean;
  reportData: ReportType;
}
