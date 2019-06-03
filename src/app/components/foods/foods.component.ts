import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { FoodService } from '@/services/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodDialogComponent } from './food-dialog/food-dialog.component';
import { Food } from '@/models/food.model';

export interface Allergen { id: string; name: string; }

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent implements OnInit {

  private foodCollection: AngularFirestoreCollection<Food>;
  foods: Observable<Food[]>;
  expandedFood: string;

  allergens: Array<Allergen> = [
    {id: "vegetarian", name: "Vegetáriánus"},
    {id: "vegan", name : "Vegán"},
    {id: "lactozeFree", name : "Laktózmentes"},
    {id: "glutenFree", name : "Gluténmentes"}
  ];

  constructor(
    private afs: AngularFirestore,
    private foodService: FoodService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.foodCollection = afs.collection<Food>('foods');
    this.foods = this.foodService.getFoods();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const food = this.foodService.getFood(id);
      this.openFoodDialog(food);
    }
  }

  ngOnInit() {
  }

  openFoodDialog(food: Food): void {
    const dialogRef = this.dialog.open(FoodDialogComponent, {
      width: '350px',
      data: {food}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/foods']);
    });
  }

  deleteFood(id: string) {
    this.foodCollection.doc(id).delete().then(() => {
      this.snackBar.open('Étel sikeresen törölve!', '', {
        duration: 3000
      });
    });
  }

  isAllergenSelected(allergenId: string, food: Food) {
    return _.includes(food.allergens, allergenId);
  }

  setExpandedFood(foodId) {
    this.expandedFood = foodId;
  }
}
