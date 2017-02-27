import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './shared/user/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UnauthenticatedGuard implements CanActivate {

  constructor(private _router: Router, private _userService: UserService) {}

  canActivate(): boolean {
    if(this._userService.getAuthorizationToken()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
