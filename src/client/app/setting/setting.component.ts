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
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


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
  projectForm: FormGroup;
  thresholdForm: FormGroup;

  constructor(private setingService: SettingService, private http: Http, private fb: FormBuilder,
              private _router: Router, private confirmationService: ConfirmationService) {
    this.uploadMessage= "upload new picture";
    this.isUploading = false;
    this.selectedAddProject="";
    this.projectModal = {
      no: -1,
      title: "",
      display: false,
      projectName: "",
      projectStatus: "",
      updateDay: new Date(),
      endDay: new Date()
    };
    this.thresholdModal =  {
      no: -1,
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
    // this.projectForm = this.fb.group({
    //   'username': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
    //   'password': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]]
    // });
    //
    // this.thresholdForm = this.fb.group({
    //   'username': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
    //   'password': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]]
    // });
  }

  delConfirm(event: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        for (var i = 0; i < this.thresholdInfo.length; i++) {
          if(this.thresholdInfo[i].no == event) {
            this.thresholdInfo.splice(i,1);
            break;
          }
        }
        // this.setingService.deleteThresholdItem(event)
        //   .subscribe(
        //     projectsInfo => {
        //       //Save success or not
        //     } ,
        //     error =>  this.errorDiagnostic = <any>error
        //   )
      }
    });
  }

  UnSelectedClick(event:any) {
    this.selectedProject ={};
    this.thresholdShow = this.thresholdInfo;
  }

  addProject() {
    this.projectModal = {
      no: -1,
      title: "Add New Project",
      display: true,
      projectName: "",
      projectStatus: "",
      updateDay: new Date(),
      endDay: new Date()
    };
  }

  addThreshold() {
    this.thresholdModal =  {
      no: -1,
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
      no: project.no,
      projectName: project.projectName,
      projectStatus: project.projectStatus,
      updateDay: new Date(project.updateDay),
      endDay:  new Date(project.endDay)
    };
  }

  editThreshold(threshold: ThresholdProfile) {
    this.thresholdModal =  {
      title: "Edit Threshold",
      display: true,
      no: threshold.no,
      system: threshold.system,
      catalog: threshold.catalog,
      kpi: threshold.kpi,
      overCast:threshold.overCast,
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

  onProjectSubmit(projectInfo:ProjectModalInfo) {

    let submitForm = {
      no: projectInfo.no,
      projectName: projectInfo.projectName,
      projectStatus: projectInfo.projectStatus,
      updateDay: new Date(projectInfo.updateDay),
      endDay: new Date(projectInfo.endDay)
    };

    if( projectInfo.no == -1) {     // For new add
      submitForm.no = this.projectsInfo.length + 1;
      this.projectsInfo.push(submitForm);
    } else { // For edit
      for (var i = 0; i < this.projectsInfo.length; i++) {
        if(this.projectsInfo[i].no == projectInfo.no) {
          this.projectsInfo[i] = submitForm;
          break;
        }
      }
    }
    this.projectModal.display = false;
    // this.setingService.saveProjectInfo(submitForm)
    //   .subscribe(
    //     projectsInfo => {
    //       //Save success or not
    //     } ,
    //     error =>  this.errorDiagnostic = <any>error
    //   )

  }

  onKPISubmit(kpiInfo:KpiModalInfo) {

    let submitForm = {
      no: kpiInfo.no,
      system: kpiInfo.system,
      project: this.selectedAddProject,
      catalog: kpiInfo.catalog,
      kpi: kpiInfo.kpi,
      overCast:kpiInfo.overCast,
      rain: kpiInfo.rain,
      noticeMsg: kpiInfo.noticeMsg
    };

    if( kpiInfo.no == -1) {     // For new add
      submitForm.no = this.thresholdInfo.length + 1;
      this.thresholdInfo.push(submitForm);
    } else { // For edit
      for (var i = 0; i < this.thresholdInfo.length; i++) {
        if(this.thresholdInfo[i].no == kpiInfo.no) {
          this.thresholdInfo[i] = submitForm;
          break;
        }
      }
    }
    this.thresholdModal.display = false;
    // this.setingService.saveThresholdInfo(submitForm)
    //   .subscribe(
    //     projectsInfo => {
    //          //Save success or not
    //     } ,
    //     error =>  this.errorDiagnostic = <any>error
    //   )

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
