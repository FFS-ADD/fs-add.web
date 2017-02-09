import { Inject } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/observable/interval';
import {ProjectProfile, ThresholdProfile} from './setting.interface'
import { SettingService } from './setting.service';
import { USER_STATUS_CODES } from '../shared/user/user-status-codes';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import { ConfirmationService} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {ThresholdPipe} from './setting.pipe';

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
  selectedProject:Object;
  thresholdInfo: ThresholdProfile[];
  thresholdShow:ThresholdProfile[];
  uploadMessage: string;
  isUploading: boolean;
  display: boolean;

  constructor(private setingService: SettingService, private http:
    Http, private _router: Router, private confirmationService: ConfirmationService) {
    this.uploadMessage= "upload new picture";
    this.isUploading = false;
    this.display=false;
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

  addProject(event:any) {
    this.display = true;
  }

  addThreshold(event:any) {
    this.display = true;
  }

  editProject(no: number) {
    this.display = true;
  }

  editThreshold(no: number) {
    this.display = true;
  }

  onPrjectSelect(event: any ) {
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
        projectsInfo => this.projectsInfo = projectsInfo,
        error =>  this.errorDiagnostic = <any>error);
  }

  getThresholdInfo() {
    this.setingService.getThresholdInfo()
      .subscribe(
        thresholdInfo => this.thresholdInfo = this.thresholdShow = thresholdInfo,
        error =>  this.errorDiagnostic = <any>error);
  }

}
