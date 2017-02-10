export interface ThresholdProfile {
  no: number;
  projectNo: number;
  project: String;
  system: String;
  catalog: String;
  kpi: String;
  overcast: String;
  rain: String;
  noticeMsg: String;
}

export interface ProjectProfile {
  no: number;
  projectName: string;
  projectStatus: string
  lastUpdateDay: string
  endDay: string
}
