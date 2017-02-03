import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import {DataTableModule, SharedModule} from 'primeng/primeng';

@NgModule({
  imports: [CommonModule, AboutRoutingModule, DataTableModule, SharedModule],
  declarations: [AboutComponent],
  exports: [AboutComponent]
})
export class AboutModule { }
