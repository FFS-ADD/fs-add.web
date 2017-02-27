import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManagementComponent } from './management.component';
import { UnauthenticatedGuard } from './../unauthenticated.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'management',
        component: ManagementComponent,
        canActivate: [UnauthenticatedGuard]
      }
    ])
  ],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
