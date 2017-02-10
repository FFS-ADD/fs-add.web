import { Inject } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/observable/interval';
import {ProjectProfile, ThresholdProfile} from './setting.interface'
import { SettingService } from './setting.service';
import { USER_STATUS_CODES } from '../shared/user/user-status-codes';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import { ConfirmationService} from 'primeng/primeng';
import { ProjectModalInfo,KpiModalInfo } from './setting.class'
import {forEach} from "@angular/router/src/utils/collection";
import {SelectItem} from 'primeng/primeng';



@Component({
  moduleId: module.id,
  selector: 'setting',
  templateUrl: 'setting.component.html',
  styleUrls: ['setting.component.css'],
  providers: [ConfirmationService]
})

export class SettingComponent implements OnInit{

  errorDiagnostic: string;
  projectsInfo:  ProjectProfile[];
  selectedProject: Object;
  thresholdInfo: ThresholdProfile[];
  thresholdShow:ThresholdProfile[];
  uploadMessage: string;
  isUploading: boolean;
  thresholdModal: KpiModalInfo;
  projectModal: ProjectModalInfo;
  projectList: SelectItem[];
  selectedAddProject: string;

  constructor(private setingService: SettingService, private http:
    Http, private _router: Router, private confirmationService: ConfirmationService) {
    this.uploadMessage= "upload new picture";
    this.isUploading = false;
    this.selectedAddProject="";
    this.projectModal = {
      title: "",
      display: false,
      projectName: "",
      projectStatus: "",
      updateDate: new Date(),
      endDate: new Date()
    };
    this.thresholdModal =  {
      title: "",
      display: false,
      system: "",
      catalog: "",
      kpi: "",
      overCast:"",
      rain: "",
      noticeMsg: ""
    };
    this.projectList = [];

  }

  ngOnInit() {
    this.getProjectInfo();
    this.getThresholdInfo();
  }

  delConfirm(event: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {

      }
    });
  }

  UnSelectedClick(event:any) {
    this.selectedProject ={};
    this.thresholdShow = this.thresholdInfo;
  }

  addProject() {
    this.projectModal = {
      title: "Add New Project",
      display: true,
      projectName: "",
      projectStatus: "",
      updateDate: new Date(),
      endDate: new Date()
    };
  }

  addThreshold() {
    this.thresholdModal =  {
      title: "Add New Threshold",
      display: true,
      system: "",
      catalog: "",
      kpi: "",
      overCast:"",
      rain: "",
      noticeMsg: ""
    };
  }

  editProject(project: ProjectProfile) {
    this.projectModal = {
      title: "Edit Project",
      display: true,
      projectName: project.projectName,
      projectStatus: project.projectStatus,
      updateDate: new Date(project.lastUpdateDay),
      endDate:  new Date(project.endDay)
    };
  }

  editThreshold(threshold: ThresholdProfile) {
    this.thresholdModal =  {
      title: "Edit Threshold",
      display: true,
      system: threshold.system,
      catalog: threshold.catalog,
      kpi: threshold.kpi,
      overCast:threshold.overcast,
      rain:threshold.rain,
      noticeMsg: threshold.noticeMsg
    };
    this.selectedAddProject = threshold.project;
  }

  onProjectSelect(event: any ) {
    this.thresholdShow = this.thresholdInfo.filter( (threshold) => {
      if (event.data.projectName === "all") {
        return true;
      } else {
        return threshold.project === event.data.projectName;
      }
    });

  }

  getProjectInfo() {
    this.setingService.getProjectsInfo()
      .subscribe(
        projectsInfo => {
          this.projectsInfo = projectsInfo ;
          this.projectsInfo.forEach((info) =>{
            this.projectList.push({"label": info.projectName, "value": info.projectName});
          })} ,
        error =>  this.errorDiagnostic = <any>error);
  }

  getThresholdInfo() {
    this.setingService.getThresholdInfo()
      .subscribe(
        thresholdInfo => this.thresholdInfo = this.thresholdShow = thresholdInfo,
        error =>  this.errorDiagnostic = <any>error);
  }

}
