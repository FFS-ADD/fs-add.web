export interface ThresholdProfile {
  no: number;
  projectNo: number;
  project: string;
  system: string;
  catalog: string;
  kpi: string;
  overcast: string;
  rain: string;
  noticeMsg: string;
}

export interface ProjectProfile {
  no: number;
  projectName: string;
  projectStatus: string;
  lastUpdateDay: Date;
  endDay: Date;
}
