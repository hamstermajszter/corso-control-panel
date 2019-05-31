import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FoodDialogComponent } from '../foods/food-dialog/food-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
  }

  logout() {
    this.authService.logout().then(() => this.router.navigate(['/login']));
  }
  openNewFoodDialog(): void {
    const dialogRef = this.dialog.open(FoodDialogComponent, {
      width: '350px',
      data: {food: {id: '', name: '', allergens: []}}
    });
  }
}
