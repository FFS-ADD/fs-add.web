import { Component } from '@angular/core';

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

  constructor() {
    this.user_logined = false;
  }

  login() {
    this.user_logined = !this.user_logined;
  }

}

