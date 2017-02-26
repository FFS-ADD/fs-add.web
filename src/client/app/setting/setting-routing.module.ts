import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';
import { UnauthenticatedGuard } from './../unauthenticated.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'setting',
        component: SettingComponent,
        // canActivate: [UnauthenticatedGuard]
      }
    ])
  ],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
