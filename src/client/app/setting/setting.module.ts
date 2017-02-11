import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { SettingComponent } from './setting.component';
import { SettingRoutingModule } from './setting-routing.module';
import { AppSharedModule } from '../shared/shared.module';
import { SettingService } from './setting.service';
import {DataTableModule, SharedModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';
import {ConfirmDialogModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  imports: [CommonModule,
    SettingRoutingModule,
    AppSharedModule,
    DataTableModule,
    FileUploadModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    SharedModule,
    CalendarModule,
    DropdownModule,
    MaterialModule.forRoot()],
  declarations: [SettingComponent],
  exports: [SettingComponent],
  providers: [SettingService]
})
export class SettingModule { }
