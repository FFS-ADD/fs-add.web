import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { NameListService } from './name-list/name-list.service';
import { UserService } from './user/user.service';

import { userData } from './mock-data/user-mock-data';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, InMemoryWebApiModule.forRoot(userData, {delay: 500})],
  declarations: [ToolbarComponent, FooterComponent],
  exports: [ToolbarComponent,FooterComponent,
    CommonModule, FormsModule, RouterModule]
})
export class AppSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppSharedModule,
      providers: [NameListService, UserService]
    };
  }
}
