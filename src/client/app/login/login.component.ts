import { Inject } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { USER_STATUS_CODES } from '../shared/user/user-status-codes';
import { UserService } from '../shared/user/user.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

function userValidator(control: FormControl): { [s: string]: boolean }  {

  let isEndRight: boolean = !control.value.match(/accenture.com$/);
  return isEndRight ? {invalidUser: true}: null;
}

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit{
  title = 'Login';
  authenticatedObs: Observable<boolean>;

  loginForm: FormGroup;
  /**
   * Boolean used in telling the UI
   * that the form has been submitted
   * and is awaiting a response
   */
  submitted: boolean = false;

  /**
   * Diagnostic message from received
   * form request error
   */
  errorDiagnostic: string;

  constructor(private _userService: UserService, private _router: Router, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'username': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64),userValidator]],
      'password': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]]
    });
  }

  onSubmit() {
    /**
     * Innocent until proven guilty
     */
    this.submitted = true;
    this.errorDiagnostic = null;

    this._userService.login(this.loginForm.value).subscribe(data => {
      this._router.navigate(['/']);
    },
    error => {
      this.submitted = false;
      let objectSource:any = USER_STATUS_CODES;
      this.errorDiagnostic =  objectSource[error.status] || objectSource[500];
      // this._router.navigate(['/']);
    });
  }
}
