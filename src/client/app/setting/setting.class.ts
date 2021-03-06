export class Threshold {
  id: string;
  project: string;
  system: string;
  catalog: string;
  kpi: string;
  overCast: number;
  rain: number;
  noticeMsg: string;
  constructor(id: string, system: string, project: string, catalog: string,
              kpi: string, overCast: number, rain: number, noticeMsg: string){
    this.id = id;
    this.system = system;
    this.project = project;
    this.catalog = catalog;
    this.kpi = kpi;
    this.overCast = overCast;
    this.rain = rain;
    this.noticeMsg = noticeMsg;
  }
}

export class Project {
  id: string;
  projectName: string;
  projectStatus: string;
  updateDay: Date;
  endDay: Date;
  constructor(id: string, projectName: string,
              projectStatus: string, updateDay: Date, endDay: Date){
    this.id = id;
    this.projectName = projectName;
    this.projectStatus = projectStatus;
    this.updateDay = updateDay;
    this.endDay = endDay;
  }

}


export class ProjectModal extends Project{

  title: string;
  display: boolean;

  constructor(id: string, title: string, display: boolean, projectName: string,
              projectStatus: string, updateDay: Date, endDay: Date){
    super(id,projectName,projectStatus,updateDay,endDay);
    this.title = title;
    this.display = display;
  }

}

export class ThresholdModal extends Threshold{

  title: string;
  display: boolean;

  constructor(id: string, title: string, display: boolean, system: string,
              project: string, catalog: string, kpi: string,overCast: number, rain:
                number, noticeMsg: string){
    super(id, system,project,catalog,kpi,overCast,rain,noticeMsg);
    this.title = title;
    this.display = display;
  }

}
