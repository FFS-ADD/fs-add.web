import { Inject } from '@angular/core';
import { Component, OnInit, EventEmitter, Output} from '@angular/core';
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
  selector: 'setting-project',
  templateUrl: 'setting-project.component.html',
  styleUrls: ['setting.component.css'],
  providers: []
})

export class SettingProjectComponent implements OnInit{

  errorDiagnostic: string;
  projectLists:  Project[];
  selectedProject: Threshold;
  projectModal: ProjectModal;
  selectedAddProject: string;
  projectSelectList: SelectItem[];

  constructor(private setingService: SettingService, private http: Http, private fb: FormBuilder,
              private _router: Router, private confirmationService: ConfirmationService) {
    this.selectedAddProject="";
    this.projectModal = new ProjectModal( -1, "",false, "", "", new Date(),new Date());
  }

  ngOnInit() {
    this.getProjectInfo();
  }

  onProjectSubmit(projectInfo:ProjectModal) {

    let submitForm = new Project(projectInfo.id, projectInfo.projectName,
      projectInfo.projectStatus,new Date(projectInfo.updateDay.getFullYear(), projectInfo.updateDay.getMonth(), projectInfo.updateDay.getDate()),
      new Date(projectInfo.endDay.getFullYear(), projectInfo.endDay.getMonth(), projectInfo.endDay.getDate()));

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

  onProjectSelect(event:  Project) {
    this.setingService.selectProject(event);
  }

  addProject(): void {
    this.projectModal = new ProjectModal( -1, "Add Project",true, "", "", new Date(),new Date());
  }

  editProject(project: ProjectModal) {
    this.projectModal = new ProjectModal (
      project.id, "Edit Project", true,
      project.projectName, project.projectStatus,
      new Date(project.updateDay),  new Date(project.endDay));
  }

  UnSelectedClick(event:any) {
    this.selectedProject = null;
    this.setingService.unselectProject();
  }

  getProjectInfo() {
    this.setingService.getProjectList()
      .subscribe(
        projectsInfo => {
          this.projectLists = projectsInfo ;
          this.projectSelectList = [];
          this.projectLists.forEach((info) =>{
            this.projectSelectList.push({"label": info.projectName, "value": info.projectName});
          });
          this.setingService.projectChange.emit(this.projectSelectList);
        } ,
        error =>  this.errorDiagnostic = <any>error);
  }

}
