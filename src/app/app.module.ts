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
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { CollapseDirective } from 'ng2-bootstrap';
import { ProfileComponent } from './profile/profile.component'
import { CountryPickerModule } from 'angular2-countrypicker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProductsComponent,
    NavigationComponent,
    MemberComponent,
    VerifyEmailComponent,
    ProductDetailComponent,
    CreateProductComponent,
    CollapseDirective,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutes,
    CountryPickerModule.forRoot()
  ],
  providers: [ ApiService, AuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
