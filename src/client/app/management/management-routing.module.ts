import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManagementComponent } from './management.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'management', component: ManagementComponent }
    ])
  ],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
