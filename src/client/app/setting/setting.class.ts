import {Project, Threshold} from "./setting.interface";

export class ProjectModal implements Project{
  id: number;
  projectName: string;
  projectStatus: string;
  updateDay: Date;
  endDay: Date;
  private title: string;
  private display: boolean;

  constructor(id: number, title: string, display: boolean, projectName: string,
              projectStatus: string, updateDay: Date, endDay: Date){
    this.id = id;
    this.title = title;
    this.display = display;
    this.projectName = projectName;
    this.projectStatus = projectStatus;
    this.updateDay = updateDay;
    this.endDay = endDay;
  }

  set projectTitle(ntitle: string){
  this.title = ntitle;
}

  get projectTitle() {
    return this.title;
  }

  set isModalDisplay(display: boolean){
    this.display = display;
  }

  get isModalDisplay() {
    return this.display;
  }

}

export class ThresholdModal implements Threshold{
  id: number;
  system: string;
  project: string;
  catalog: string;
  kpi: string;
  overCast:string;
  rain: string;
  noticeMsg: string;
  private title: string;
  private display: boolean;

  constructor(id: number, title: string, display: boolean, system: string,
              project: string, catalog: string, kpi: string,overCast: string, rain:
                string, noticeMsg: string){
    this.id = id;
    this.title = title;
    this.display = display;
    this.system = system;
    this.project = project;
    this.catalog = catalog;
    this.kpi = kpi;
    this.overCast = overCast;
    this.rain = rain;
    this.noticeMsg = noticeMsg;
  }

  set projectTitle(ntitle: string){
    this.title = ntitle;
  }

  get projectTitle() {
    return this.title;
  }

  set isModalDisplay(display: boolean){
    this.display = display;
  }

  get isModalDisplay() {
    return this.display;
  }

}
