import { Inject } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/observable/interval';
import {userProfile} from '../shared/user/user-profile'
import { UserService } from '../shared/user/user.service';
import { USER_STATUS_CODES } from '../shared/user/user-status-codes';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import { ConfirmationService} from 'primeng/primeng';
import {ManagementService} from "./mangement.service";

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
  selectedUser:any;

  constructor(private managementService: ManagementService, private http:
    Http, private _router: Router, private confirmationService: ConfirmationService) {
    this.uploadMessage= "upload new picture";
    this.isUploading = false;
    this.selectedUser ={}
  }

  ngOnInit() {
    this.getUsersList();
  }

  confirmPopup(event: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        for (var i = 0; i < this.users.length; i++) {
          if(this.users[i].no == event) {
            this.users.splice(i,1);
            break;
          }
        }
      }
    });
  }

  UnSelectedClick(event:any) {
    this.selectedUser ={};
    //TODO clear Form information
  }

  fileChangeEvent(event:any) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      this.uploadMessage="uploading..."
      this.isUploading = true;
      this.managementService.uploadAvatarPicture(file).subscribe(data => {
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

  getUsersList() {
    this.managementService.getUserListInfo()
      .subscribe(
        userInfo => this.users = userInfo,
        error =>  this.errorDiagnostic = <any>error);
  }

}
