import { Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './components/auth/auth.component';
import { FoodsComponent } from './components/foods/foods.component';
import { MenuComponent } from './components/menu/menu.component';

export const ROUTES: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'foods', component: FoodsComponent, canActivate: [AuthGuard] },
  { path: 'foods/:id', component: FoodsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'foods' }
];
