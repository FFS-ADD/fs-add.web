import { Inject } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/observable/interval';
import {KpiProfile} from '../shared/setting/kpi-profile'
import { UserService } from '../shared/user/user.service';
import { USER_STATUS_CODES } from '../shared/user/user-status-codes';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import { ConfirmationService} from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'setting',
  templateUrl: 'setting.component.html',
  styleUrls: ['setting.component.css'],
  providers: [ConfirmationService]
})

export class SettingComponent implements OnInit{

  errorDiagnostic: string;
  projectSettings:  KpiProfile[];
  uploadMessage: string;
  isUploading: boolean;

  constructor(private _userService: UserService, private http:
    Http, private _router: Router, private confirmationService: ConfirmationService) {
    this.uploadMessage= "upload new picture";
    this.isUploading = false;
  }

  ngOnInit() {
    this.getUsers();
  }

  confirmPopup(event: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {

      }
    });
  }


  fileChangeEvent(event:any) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      this.uploadMessage="uploading..."
      this.isUploading = true;
      this._userService.uploadAvatarPicture(file).subscribe(data => {
          this.uploadMessage= "upload new picture";
          this.isUploading = false;
          this._router.navigate(['/']);
        },
        error => {
          this.uploadMessage= "upload new picture";
          this.isUploading = false;
          let objectSource:any = USER_STATUS_CODES;
          this.errorDiagnostic =  objectSource[error.status] || objectSource[500];
          // this._router.navigate(['/']);
        });
    }
  }

  getUsers() {
    // this.errorDiagnostic = null;
    // this._userService.getUsers().subscribe(res => {
    //     this.users = res;
    // },
    // error => {
    //   let objectSource: any = USER_STATUS_CODES;
    //   this.errorDiagnostic = objectSource[error.status] || objectSource[500];
    //   this._router.navigate(['/']);
    // });
    this.projectSettings = [
        {
        "no": 1,
        "system": "Redmine",
        "catalog": "bug",
        "kpi": "bug Amount",
        "overcast": "0.8",
        "rain": "1",
        "noticeMsg":"Please bug"
        },{
        "no": 2,
        "system": "Redmine",
        "catalog": "task",
        "kpi": "task Amount",
        "overcast": "0.8",
        "rain": "1",
        "noticeMsg":"Please task"
        }, {
        "no": 3,
        "system": "Redmine",
        "catalog": "QA",
        "kpi": "QA Amount",
        "overcast": "0.8",
        "rain": "1",
        "noticeMsg":"Please QA"
      }, {
        "no": 4,
        "system": "SonarQube",
        "catalog": "Quality",
        "kpi": "Quality Threshold",
        "overcast": "0.8",
        "rain": "1",
        "noticeMsg":"Please Quality"
      }
    ];
  }

}
