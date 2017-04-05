import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent } from './products/products.component'

export const router: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full'},
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
]

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(router);
