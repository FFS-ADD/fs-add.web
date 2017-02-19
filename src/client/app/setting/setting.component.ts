import { Inject } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
  selector: 'setting',
  templateUrl: 'setting.component.html',
  styleUrls: ['setting.component.css'],
  providers: [ConfirmationService]
})

export class SettingComponent {

  constructor(private setingService: SettingService, private http: Http, private fb: FormBuilder,
              private _router: Router, private confirmationService: ConfirmationService) {

  }

}
