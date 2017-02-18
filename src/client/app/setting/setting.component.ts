import { Inject } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/observable/interval';
import { SettingService } from './setting.service';
import { USER_STATUS_CODES } from '../shared/user/user-status-codes';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import { ConfirmationService} from 'primeng/primeng';
import { ProjectModal,ThresholdModal,Project, Threshold} from './setting.class'
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
  projectLists:  Project[];
  thresholdAllList: Threshold[];
  thresholdShowList:Threshold[];
  selectedProject: Threshold;

  thresholdModal: ThresholdModal;
  projectModal: ProjectModal;
  projectSelectList: SelectItem[];
  selectedAddProject: string;
  projectForm: FormGroup;
  thresholdForm: FormGroup;

  constructor(private setingService: SettingService, private http: Http, private fb: FormBuilder,
              private _router: Router, private confirmationService: ConfirmationService) {
    this.selectedAddProject="";
    this.projectModal = new ProjectModal( -1, "",false, "", "", new Date(),new Date());
    this.thresholdModal = new ThresholdModal ( -1, "",false, "", "", "", "", "", "", "");
    this.projectSelectList = [];

  }

  ngOnInit() {
    this.getProjectInfo();
    this.getThresholdInfo();
  }

  onKPISubmit(kpiInfo:ThresholdModal) {

    let submitForm = new Threshold ( kpiInfo.id, kpiInfo.system, this.selectedAddProject,
      kpiInfo.catalog, kpiInfo.kpi, kpiInfo.overCast, kpiInfo.rain, kpiInfo.noticeMsg);

    if( kpiInfo.id == -1) {     // For new add
      //Temp add the id should be add by backend
      submitForm.id = this.thresholdAllList.length + 1;
      this.setingService.createThreshold(submitForm)
        .subscribe(
          (resThreshold: Threshold)=> {
            this.getThresholdInfo();
          });
    } else { // For edit
      this.setingService.updateThreshold(submitForm)
        .subscribe(
          (resThreshold: Threshold)=> {
            this.getThresholdInfo();
          });
    }

    this.thresholdModal.display = false;
  }

  onProjectSubmit(projectInfo:ProjectModal) {

    let submitForm = new Project(projectInfo.id, projectInfo.projectName,
      projectInfo.projectStatus,new Date(projectInfo.updateDay),new Date(projectInfo.endDay));

    if( projectInfo.id == -1) {     // For new add
      //Temp add the id should be add by backend
      submitForm.id = this.projectLists.length + 1;
      this.setingService.createProject(submitForm)
        .subscribe(
          (resProject: Project)=> {
            this.getProjectInfo();
        });
    } else { // For edit
      this.setingService.updateProject(submitForm)
        .subscribe(
          (resProject: Project)=> {
            this.getProjectInfo();
          });
    }
    this.projectModal.display = false;

  }

  onProjectSelect(event: any ) {
    this.thresholdShowList = this.thresholdAllList.filter( (threshold) => {
      if (event.data.projectName === "all") {
        return true;
      } else {
        return threshold.project === event.data.projectName;
      }
    });
  }

  addProject(): void {
    this.projectModal = new ProjectModal( -1, "Add Project",true, "", "", new Date(),new Date());
  }

  addThreshold() {
    this.thresholdModal = new ThresholdModal ( -1, "Add Threshold",true, "", "", "", "", "", "", "");
  }

  editProject(project: ProjectModal) {
    this.projectModal = new ProjectModal (
      project.id, "Edit Project", true,
      project.projectName, project.projectStatus,
      new Date(project.updateDay),  new Date(project.endDay));
  }

  editThreshold(threshold: ThresholdModal) {
    this.thresholdModal =  new ThresholdModal(
      threshold.id, "Edit Threshold", true,
      threshold.system, threshold.project, threshold.catalog, threshold.kpi,
      threshold.overCast, threshold.rain, threshold.noticeMsg);

    this.selectedAddProject = threshold.project
  }

  UnSelectedClick(event:any) {
    this.selectedProject = null;
    this.thresholdShowList = this.thresholdAllList;
  }

  delConfirm(threshold: Threshold) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.deleteThreshold(threshold);
      }
    });
  }

  deleteThreshold(threshold: Threshold): void {
    this.setingService
      .deleteThreshold(threshold.id)
      .subscribe(() => {
        this.thresholdAllList = this.thresholdAllList.filter(h => h !== threshold);
        this.thresholdShowList = this.thresholdShowList.filter(h => h !== threshold);
        if (this.selectedProject === threshold) { this.selectedProject = null; }
      });
  }

  getProjectInfo() {
    this.setingService.getProjectList()
      .subscribe(
        projectsInfo => {
          this.projectLists = projectsInfo ;
          this.projectLists.forEach((info) =>{
            this.projectSelectList.push({"label": info.projectName, "value": info.projectName});
          })} ,
        error =>  this.errorDiagnostic = <any>error);
  }

  getThresholdInfo() {
    this.setingService.getThresholdList()
      .subscribe(
        thresholdInfo => this.thresholdAllList = this.thresholdShowList = thresholdInfo,
        error =>  this.errorDiagnostic = <any>error);
  }

}
