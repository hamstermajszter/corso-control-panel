import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Food } from '@/models/food.model';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private foodCollection: AngularFirestoreCollection<Food>;
  foods: BehaviorSubject<Food[]>;

  constructor( private afs: AngularFirestore ) {
    this.foodCollection = afs.collection<Food>('foods');
    this.foods = new BehaviorSubject([]);
    this.foodCollection.valueChanges().subscribe(this.foods);
  }

  getFoods() {
    return this.foods;
  }

  getFood(id: string): Food {
    return _.find(this.foods.getValue(), food => food.id === id);
  }
}
