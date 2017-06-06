import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent } from './products/products.component';
import { MemberComponent } from './member/member.component';
import { AuthGuard } from './auth-guard.service'
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component'

export const router: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full'},
  { path: 'profile', redirectTo: 'profile/show', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verify_email', component: VerifyEmailComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'memberinfo', component: MemberComponent, canActivate: [AuthGuard]},
  { path: 'create', component: CreateProductComponent, canActivate: [AuthGuard]},
  { path: 'profile/show', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
]

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(router);
