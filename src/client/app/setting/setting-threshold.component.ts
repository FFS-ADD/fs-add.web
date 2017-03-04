import { Inject } from '@angular/core';
import { Component, OnInit, OnDestroy, Input  } from '@angular/core';
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
  selector: 'setting-threshold',
  templateUrl: 'setting-threshold.component.html',
  styleUrls: ['setting.component.css'],
  providers: [ConfirmationService]
})

export class SettingThresholdComponent implements OnInit{

  errorDiagnostic: string;
  thresholdAllList: Threshold[];
  thresholdShowList:Threshold[];
  thresholdModal: ThresholdModal;
  selectedAddProject: string;

  selectProjectLists: SelectItem[];
  selectSystemLists:SelectItem[];
  selectCatalogLists:SelectItem[];

  constructor(private setingService: SettingService, private http: Http, private fb: FormBuilder,
              private _router: Router, private confirmationService: ConfirmationService) {
    this.selectedAddProject="";
    this.thresholdModal = new ThresholdModal ( "-1", "",false, "", "", "", "", 0, 0, "");
    this.selectProjectLists = [];
    this.setingService.projectChange.subscribe((list:SelectItem[]) => this.selectProjectLists = list);
    this.setingService.selectedProject.subscribe((project: Project) => this.onOutProjectSelect(project));
    this.setingService.unselectedProject.subscribe((flag: boolean) => this.onUnselectProject(flag));
    this.selectSystemLists = setingService.getSelectSystemList();

  }

  onSystemSelected(value: string) {

    this.thresholdModal.system = value;
    this.selectCatalogLists = this.setingService.getSelectCatalogList(value);

  }

  onCatalogSelected(value: string) {

    this.thresholdModal.catalog = value;
    this.thresholdModal.kpi = this.setingService.getCatalogInformation(value);

  }

  onProjectSelected(value: string) {

    this.thresholdModal.project = value;

  }

  onOutProjectSelect(project: any) {

    this.thresholdShowList = this.thresholdAllList.filter( (threshold) => {

      return threshold.project === project.data.projectName;

    });
  }

  onUnselectProject(flag: boolean) {

    this.thresholdShowList = this.thresholdAllList;

  }

  ngOnInit() {
    this.getThresholdInfo();
  }

  onKPISubmit(kpiInfo:ThresholdModal) {

    let submitForm = new Threshold ( kpiInfo.id, kpiInfo.system, kpiInfo.project,
      kpiInfo.catalog, kpiInfo.kpi, kpiInfo.overCast, kpiInfo.rain, kpiInfo.noticeMsg);

    if( kpiInfo.id ===  "-1") {     // For new add
      //Temp add the id should be add by backend
      submitForm.id = "";
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

  addThreshold() {
    this.thresholdModal = new ThresholdModal ( "-1", "Add Threshold",true, "", "", "", "", 0, 0, "");
  }

  editThreshold(threshold: ThresholdModal) {
    this.thresholdModal =  new ThresholdModal(
      threshold.id, "Edit Threshold", true,
      threshold.system, threshold.project, threshold.catalog, threshold.kpi,
      threshold.overCast, threshold.rain, threshold.noticeMsg);

    this.selectedAddProject = threshold.project
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
      .deleteThreshold(threshold)
      .subscribe(() => {
        this.thresholdAllList = this.thresholdAllList.filter(h => h !== threshold);
        this.thresholdShowList = this.thresholdShowList.filter(h => h !== threshold);
      });
  }

  getThresholdInfo() {
    this.setingService.getThresholdList()
      .subscribe(
        thresholdInfo => this.thresholdAllList = this.thresholdShowList = thresholdInfo,
        error =>  this.errorDiagnostic = <any>error);
  }

}
