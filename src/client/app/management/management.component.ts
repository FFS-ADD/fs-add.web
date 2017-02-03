import { Inject } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/observable/interval';
import {userProfile} from '../shared/user/user-profile'
import { UserService } from '../shared/user/user.service';
import { USER_STATUS_CODES } from '../shared/user/user-status-codes';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import { ConfirmationService} from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'management',
  templateUrl: 'management.component.html',
  styleUrls: ['management.component.css'],
  providers: [ConfirmationService]
})

export class ManagementComponent implements OnInit{

  errorDiagnostic: string;
  users:  userProfile[];
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
    this.users = [
        {
        "no": 1,
        "project": "PJ1",
        "avatar": "assets/img/background.jpg",
        "email": "wei.zhang@accenture.com",
        "fristName": "Wei",
        "lastName": "zhang"
        },{
        "no": 2,
        "project": "PJ2",
        "avatar": "assets/img/dashboard.png",
        "email": "changsheng.liu@accenture.com",
        "fristName": "changsheng",
        "lastName": "liu"
        }, {
        "no": 3,
        "project": "PJ1",
        "avatar": "assets/img/dashboard.png",
        "email": "xiaodong.deng@accenture.com",
        "fristName": "xiaodong",
        "lastName": "deng"
      }, {
        "no": 4,
        "project": "PJ3",
        "avatar": "assets/img/dashboard.png",
        "email": "baofeng.wu@accenture.com",
        "fristName": "baofeng",
        "lastName": "wu"
      }
    ];
  }

}
