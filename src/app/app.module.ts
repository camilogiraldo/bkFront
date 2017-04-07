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
import { NavigationComponent } from './navigation/navigation.component';
import { MemberComponent } from './member/member.component'
import { AuthGuard } from './auth-guard.service';
import { VerifyEmailComponent } from './verify-email/verify-email.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProductsComponent,
    NavigationComponent,
    MemberComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutes,
  ],
  providers: [ ApiService, AuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
