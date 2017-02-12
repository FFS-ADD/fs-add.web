import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ManagementComponent } from './management.component';
import { ManagementRoutingModule } from './management-routing.module';
import { AppSharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';
import { UserService } from '../shared/user/user.service';
import {DataTableModule, SharedModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';
import {ConfirmDialogModule} from 'primeng/primeng';
import {ManagementService} from "./mangement.service";


@NgModule({
  imports: [CommonModule,
    ManagementRoutingModule,
    AppSharedModule,
    DataTableModule,
    FileUploadModule,
    ConfirmDialogModule,
    SharedModule,
    MaterialModule.forRoot()],
  declarations: [ManagementComponent],
  exports: [ManagementComponent],
  providers: [ManagementService
   ]
})
export class ManagementModule { }
