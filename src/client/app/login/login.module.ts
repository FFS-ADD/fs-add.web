import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { AppSharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../shared/user/user.service';

@NgModule({
  imports: [CommonModule,
    LoginRoutingModule,
    AppSharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule.forRoot()],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [NameListService,
    UserService,
    {provide: 'apiBase', useValue: 'https://github.com/FFS-ADD/fs-add.web'}]
})
export class LoginModule { }
