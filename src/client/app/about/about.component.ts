import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {userProfile} from '../shared/user/user-profile'
import { UserService } from '../shared/user/user.service';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})
export class AboutComponent {
  users:  userProfile[];

  constructor(private _userService: UserService, private _router: Router) {
    this.users = [
      {
        "no": 1,
        "project": "PJ1",
        "avatar": "assets/img/dashboard.png",
        "email": "wei.zhang@accenture.com",
        "fristName": "Wei",
        "lastName": "zhang"
      }, {
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
