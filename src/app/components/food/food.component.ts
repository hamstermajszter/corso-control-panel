import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Food { id: string; name: string}

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  form: FormGroup;
  foodName = new FormControl('');
  private foodCollection: AngularFirestoreCollection<Food>;
  foods: Observable<Food[]>;

  allergens = [
    {id: "vegetarian", name: "Vegetáriánus"},
    {id: "vegan", name : "Vegán"},
    {id: "lactozeFree", name : "Laktózmentes"},
    {id: "glutenFree", name : "Gluténmentes"}
  ]

  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder
  ) {
    this.foodCollection = afs.collection<Food>('foods');
    this.foods = this.foodCollection.valueChanges();
    this.form = this.formBuilder.group({
      name: new FormControl(''),
      allergens: new FormArray([])
    });
    Object.keys(this.allergens).map(allergen => {
      const control = new FormControl(false);
      (this.form.controls.allergens as FormArray).push(control);
    });
  }

  ngOnInit() {
  }

  createFood() {
    const id = this.afs.createId();
    const newFood: Food = { id, name: this.foodName.value };
    this.foodCollection.doc(id).set(newFood);
    console.log(this.form.value);
  }

}
