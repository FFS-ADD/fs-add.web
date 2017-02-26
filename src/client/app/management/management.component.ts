import { Inject } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/observable/interval';
import {User} from '../shared/user/user'
import { UserService } from '../shared/user/user.service';
import { USER_STATUS_CODES } from '../shared/user/user-status-codes';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import { ConfirmationService} from 'primeng/primeng';
import {ManagementService} from "./mangement.service";
import {SelectItem} from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'management',
  templateUrl: 'management.component.html',
  styleUrls: ['management.component.css'],
  providers: [ConfirmationService]
})

export class ManagementComponent implements OnInit{

  defaultAvatar: string = "assets/img/defaultAvatar.jpg";
  errorDiagnostic: string;
  users:  User[];
  uploadMessage: string;
  selectedUser:User;
  rolesList: SelectItem[];
  user: User;
  submitted = false;
  isUploading: boolean;
  isNewUser: boolean;
  base64img: string;

  //Max Size 2M
  private maxUploadImageSize: number = 1024 * 1024 * 2;

  constructor(private managementService: ManagementService, private http:
    Http, private _router: Router, private confirmationService: ConfirmationService) {
    this.uploadMessage= "select new picture";
    this.isUploading = false;
    this.selectedUser = null;
    this.user = new User("0","","","","","","","");
    this.isNewUser = true;
    this.rolesList = [
      {"label": "Owner", "value": "Owner"},
      {"label": "Member", "value": "Member"},
    ];
    this.base64img = this.defaultAvatar;
  }

  ngOnInit() {
    this.getUsersList();
  }

  confirmPopup(user: User) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.delete(user);
      }
    });
  }

  onUserSelect(event: any) {
    this.user = new User(
      event.data.id,
      event.data.role,
      event.data.project,
      event.data.avatar,
      event.data.email,
      event.data.password,
      event.data.firstName,
      event.data.lastName,
    );
    this.base64img = event.data.avatar;
    this.isNewUser = false;
  }

  UnSelectedClick(event:any) {
    this.selectedUser = null;
    this.isNewUser = true;
    this.base64img = this.defaultAvatar;
    //TODO clear Form information
  }

  fileChangeEvent(event:any) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      this.isUploading = true;
      if (file.size > this.maxUploadImageSize) {
        this.errorDiagnostic = "Can't upload image over 2M!"
      } else {
        this.managementService.readFile(file)
          .then( (result:any) => {
            this.base64img = result;
            this.errorDiagnostic = "";
          });
      }
    }
  }

  getUsersList() {
    this.managementService.getUserListInfo()
      .subscribe(
        userInfo => this.users = userInfo,
        error =>  this.errorDiagnostic = <any>error);
  }


  addNewUser(): void {
    this.isNewUser = true;
    this.selectedUser = null;
    this.user = new User("-1","","",this.defaultAvatar,"","","","");
    this.base64img = this.defaultAvatar;
  }

  submitForm(user: User) {
    if (!user) { return; }
    user.avatar = this.base64img;
    if (this.isNewUser) {
      this.managementService.createUser(user)
        .then((user:User) => {
          this.getUsersList();
          this.user = new User("0","","",this.defaultAvatar,"","","","");
          this.selectedUser = null;
          this.isNewUser = true;
          this.base64img = this.defaultAvatar;
        });
    } else {
      this.managementService.updateUser(user)
        .then((user:User) => {
          this.getUsersList();
          this.user = new User("0","","",this.defaultAvatar,"","","","");
          this.selectedUser = null;
          this.isNewUser = true;
          this.base64img = this.defaultAvatar;
        });
    }

  }

  delete(user: User): void {
    this.managementService
      .deleteUser(user)
      .then(() => {
        this.users = this.users.filter(h => h !== user);
        if (this.selectedUser === user) { this.selectedUser = null; }
      });
  }
}
