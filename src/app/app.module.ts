import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LayoutModule } from './layout/layout.module';  

import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';;
import { environment } from './../environments/environment';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { AuthService } from './auth/services/auth.service';
import { CanEditGuard } from './auth/guards/can-edit.guard';
import { CanAdminGuard } from './auth/guards/can-admin.guard';
import { CanSuscriptorGuard } from './auth/guards/can-suscriptor.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';


import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MiTablaComponent } from './mi-tabla/mi-tabla.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';

// import {MatStepperModule} from '@angular/material/stepper';

import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterCodeComponent } from './register-code/register-code.component';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './create-product/create-product.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SendEmailComponent,
    ProfileComponent,
    MiTablaComponent,
    SideNavComponent,
    ContactComponent,
    RegisterCodeComponent,
    ProductsComponent,
    CreateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, AngularFireStorageModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSliderModule,
    MatInputModule, MatSelectModule, MatIconModule,
    MatCardModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatToolbarModule,
    MatSidenavModule,
    // MatStepperModule
    
  ],
  exports: [SideNavComponent],
  providers: [AuthService,CanEditGuard,CanAdminGuard,CanSuscriptorGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
