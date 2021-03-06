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
import {SettingProjectComponent} from "./setting-project.component";
import {SettingThresholdComponent} from "./setting-threshold.component";
import { UnauthenticatedGuard } from './../unauthenticated.guard';




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
  declarations: [SettingComponent, SettingProjectComponent, SettingThresholdComponent],
  exports: [SettingComponent, SettingProjectComponent, SettingThresholdComponent],
  providers: [SettingService, UnauthenticatedGuard]
})
export class SettingModule { }
