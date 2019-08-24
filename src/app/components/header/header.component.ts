import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FoodDialogComponent } from '../foods/food-dialog/food-dialog.component';
import { MenuService } from '@/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  numberOfFoodsOnMenu: number;

  constructor(
    private authService: AuthenticationService,
    private menuService: MenuService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.menuService.entries$.subscribe(entries => {
      this.numberOfFoodsOnMenu = entries.length;
    });
  }

  logout() {
    this.authService.logout().then(() => this.router.navigate(['/login']));
  }

  openNewFoodDialog(): void {
    this.dialog.open(FoodDialogComponent, {
      data: {food: {id: '', name: '', allergens: [], history: []}}
    });
  }
}
