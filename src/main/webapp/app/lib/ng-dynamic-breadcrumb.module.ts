import { NgModule } from '@angular/core';
import { NgDynamicBreadcrumbComponent } from './ng-dynamic-breadcrumb.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    RouterModule,
    CommonModule,
    NgDynamicBreadcrumbComponent
  ],
  exports: [NgDynamicBreadcrumbComponent]
})
export class NgDynamicBreadcrumbModule {
}
