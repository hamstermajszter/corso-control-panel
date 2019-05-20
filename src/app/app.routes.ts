import { Routes, CanActivate } from '@angular/router';
import {
  AuthGuardService as AuthGuard
} from './services/auth-guard.service';
import { AuthComponent } from './components/auth/auth.component';
import { FoodComponent } from './components/food/food.component';

export const ROUTES: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'food', component: FoodComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'food' }
];
