import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Allergen } from '../foods.component';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { Food, FoodType } from '@/models/food.model';
import { FoodService } from '@/services/food.service';

@Component({
  selector: 'app-new-food',
  templateUrl: './food-dialog.component.html',
  styleUrls: ['./food-dialog.component.scss']
})
export class FoodDialogComponent implements OnInit {
  private foodCollection: AngularFirestoreCollection<Food>;
  form: FormGroup;
  food: Food;
  foodTypes = _.zipWith(Object.keys(FoodType), Object.values(FoodType), (key, value) => {
    return {key, value};
  });

  allergens: Array<Allergen> = [
    {id: "vegetarian", name: "Vegetáriánus"},
    {id: "vegan", name : "Vegán"},
    {id: "lactozeFree", name : "Laktózmentes"},
    {id: "glutenFree", name : "Gluténmentes"}
  ];

  constructor(
    private afs: AngularFirestore,
    private foodService: FoodService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<FoodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {food: Food}
  ) {
    this.food = data.food;
    this.initFoodModelForm();
  }

  ngOnInit() {
  }

  saveFood() {
    if (this.form.valid) {
      this.food.id = this.food.id || this.afs.createId();
      this.food.name = this.form.value.name;
      this.food.type = this.form.value.type;
      const selectedAllergens = _.filter(this.form.get('allergens').value as FormArray, allergen => allergen.selected);
      this.food.allergens = _.map(selectedAllergens, allergen => allergen.id);
      this.foodService.saveFood(this.food).then(() => {
        this.snackBar.open(`${this.food.name} sikeresen hozzáadva!`, '', {
          duration: 3000
        });
        this.dialogRef.close();
      });
    } else {
      this.snackBar.open('Kötelező étel nevet megadni!', '', {
        duration: 3000
      });
    }
  }

  initFoodModelForm() {
    this.form = this.formBuilder.group({
      name: new FormControl(this.food.name),
      type: new FormControl(this.food.type),
      allergens: new FormArray([])
    });
    const allergens = this.form.get('allergens') as FormArray;
    _.map(this.allergens, allergen => {
      const allergenFormControl = this.formBuilder.group({
        id: allergen.id,
        displayedName: allergen.name,
        selected: new FormControl(_.includes(this.food.allergens, allergen.id))
      });
      allergens.push(allergenFormControl);
    });
  }

}
