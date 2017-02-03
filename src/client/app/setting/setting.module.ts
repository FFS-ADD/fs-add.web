import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { SettingComponent } from './setting.component';
import { SettingRoutingModule } from './setting-routing.module';
import { AppSharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';
import { UserService } from '../shared/user/user.service';
import {DataTableModule, SharedModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';
import {ConfirmDialogModule} from 'primeng/primeng';


@NgModule({
  imports: [CommonModule,
    SettingRoutingModule,
    AppSharedModule,
    DataTableModule,
    FileUploadModule,
    ConfirmDialogModule,
    SharedModule,
    MaterialModule.forRoot()],
  declarations: [SettingComponent],
  exports: [SettingComponent],
  providers: [NameListService,
    UserService
   ]
})
export class SettingModule { }
