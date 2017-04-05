import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ApiService } from './api.service';
import { ProductsComponent } from './products/products.component'
import { AppRoutes } from './app.routes';
import { NavigationComponent } from './navigation/navigation.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProductsComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutes
  ],
  providers: [ ApiService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
