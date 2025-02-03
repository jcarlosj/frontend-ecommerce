import { Routes } from '@angular/router';

import { HomeComponent } from './pages/public/home/home.component';
import { ProductsComponent } from './pages/private/products/products.component';
import { CheckoutComponent } from './pages/public/checkout/checkout.component';
import { PageNotFoundComponent } from './pages/public/page-not-found/page-not-found.component';
import { RegisterComponent } from './pages/public/register/register.component';
import { LoginComponent } from './pages/public/login/login.component';
import { DashboardComponent } from './pages/private/dashboard/dashboard.component';
import { CategoriesComponent } from './pages/private/categories/categories.component';

import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '404', component: PageNotFoundComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ authGuard, roleGuard ],
    data: { expectedRoles: [ 'registered', 'moderator', 'admin' ] }
  },
  {
    path: 'dashboard/products',
    component: ProductsComponent,
    canActivate: [ authGuard, roleGuard ],
    data: { expectedRoles: [ 'moderator', 'admin' ] }
  },
  {
    path: 'dashboard/categories',
    component: CategoriesComponent,
    canActivate: [ authGuard, roleGuard ],
    data: { expectedRoles: [ 'admin' ] }
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];
