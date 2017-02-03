import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'setting', component: SettingComponent }
    ])
  ],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
