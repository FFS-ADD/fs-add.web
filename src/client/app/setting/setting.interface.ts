export interface Threshold {
  id: number;
  project: string;
  system: string;
  catalog: string;
  kpi: string;
  overCast: string;
  rain: string;
  noticeMsg: string;
}

export interface Project {
  id: number;
  projectName: string;
  projectStatus: string;
  updateDay: Date;
  endDay: Date;
}
