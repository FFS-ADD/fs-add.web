import { Component } from '@angular/core';
import {UserService} from "../user/user.service";

/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})
export class ToolbarComponent {
  user_logined: boolean;
  userName: string = null;

  constructor(private _userService: UserService,) {
    _userService.authenticatedChange.subscribe((res:string)=> this.showLoginInfo());
    this.user_logined = false;
  }

  showLoginInfo() {
    this.user_logined = true;
    this.userName = this._userService.getLoginUserName();
  }

}

