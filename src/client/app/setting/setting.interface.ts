export interface ThresholdProfile {
  no: number;
  project: string;
  system: string;
  catalog: string;
  kpi: string;
  overCast: string;
  rain: string;
  noticeMsg: string;
}

export interface ProjectProfile {
  no: number;
  projectName: string;
  projectStatus: string;
  updateDay: Date;
  endDay: Date;
}
