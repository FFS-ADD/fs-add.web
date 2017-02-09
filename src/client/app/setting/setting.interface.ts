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
  projectName: String;
  projectStatus: String
  lastUpdateDay: String
  endDay: String
}
