import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
export class AboutComponent {}
