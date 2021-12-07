import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';

// import { HeaderLayoutComponent } from './header-layout/header-layout.component';
// import { NavbarComponent } from '../shared/navbar/navbar.component';
// import { SideNavComponent } from './side-nav/side-nav.component';
import { MaterialAngularLayoutModule } from '../shared/material-angular-layout.module';


@NgModule({
  declarations: [
    // HeaderLayoutComponent,
    // NavbarComponent,
    // SideNavComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MaterialAngularLayoutModule,
  ],
  // exports: [
  //   SideNavComponent
  // ],
})
export class LayoutModule { }
