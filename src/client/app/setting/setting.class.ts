export class Threshold {
  id: number;
  project: string;
  system: string;
  catalog: string;
  kpi: string;
  overCast: string;
  rain: string;
  noticeMsg: string;
  constructor(id: number, system: string, project: string, catalog: string,
              kpi: string,overCast: string, rain: string, noticeMsg: string){
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
  id: number;
  projectName: string;
  projectStatus: string;
  updateDay: Date;
  endDay: Date;
  constructor(id: number, projectName: string,
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

  constructor(id: number, title: string, display: boolean, projectName: string,
              projectStatus: string, updateDay: Date, endDay: Date){
    super(id,projectName,projectStatus,updateDay,endDay);
    this.title = title;
    this.display = display;
  }

}

export class ThresholdModal extends Threshold{

  title: string;
  display: boolean;

  constructor(id: number, title: string, display: boolean, system: string,
              project: string, catalog: string, kpi: string,overCast: string, rain:
                string, noticeMsg: string){
    super(id, system,project,catalog,kpi,overCast,rain,noticeMsg);
    this.title = title;
    this.display = display;
  }

}
