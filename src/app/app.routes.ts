import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent } from './products/products.component';
import { MemberComponent } from './member/member.component';
import { AuthGuard } from './auth-guard.service'
import { VerifyEmailComponent } from './verify-email/verify-email.component';

export const router: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full'},
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verify_email', component: VerifyEmailComponent },
  { path: 'memberinfo', component: MemberComponent, canActivate: [AuthGuard]}
]

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(router);
