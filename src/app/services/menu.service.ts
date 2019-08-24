import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Menu } from '@/models/menu.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food, FoodType } from '@/models/food.model';
import * as _ from 'lodash';
import { FoodService } from './food.service';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

export interface MenuEntry {
  food: Food;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  foodTypes = _.zipWith(Object.keys(FoodType), Object.values(FoodType), (key, value) => {
    return {key, value};
  });

  private menuCollection: AngularFirestoreCollection<Menu>;
  menus$: BehaviorSubject<Menu[]>;
  entries$: BehaviorSubject<Array<MenuEntry>>;

  constructor(
    private afs: AngularFirestore,
    private foodService: FoodService
  ) {
    this.menuCollection = afs.collection<Menu>('menus', ref => ref.orderBy('id', 'desc'));
    this.entries$ = new BehaviorSubject(JSON.parse(localStorage.getItem('unsavedMenu')) || []);
    this.entries$.subscribe(entries => localStorage.setItem('unsavedMenu', JSON.stringify(entries)));
    this.menus$ = new BehaviorSubject([]);
    this.menuCollection.valueChanges().subscribe(this.menus$);
  }

  addFood(food: Food): Promise<string> {
    return new Promise((resolve, reject) => {
      const foodIds: Array<string> = _.map(this.entries$.value, entry => entry.food.id);
      if (!_.includes(foodIds, food.id)) {
        this.entries$.value.push({food, price: 0});
        this.entries$.next(this.entries$.value);
        resolve(`${food.name} hozzá lett adva az étlaptervhez!`);
      } else {
        reject(`${food.name} már az étlaptervben van!`);
      }
    });
  }

  loadMenu(id: string) {
    this.entries$.next(_.find(this.menus$.value, menu => menu.id === id).entries);
  }

  resetMenu() {
    localStorage.removeItem('unsavedMenu');
    this.entries$.next([]);
  }

  updatePrice() {
    localStorage.setItem('unsavedMenu', JSON.stringify(this.entries$.value));
  }

  removeFood(entry: MenuEntry) {
    _.remove(this.entries$.value, entry);
    this.entries$.next(this.entries$.value);
  }

  saveMenu(date: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.menuCollection.doc(date).set({id: date, entries: this.entries$.value});
      _.map(this.entries$.value, entry => {
        if (!entry.food.history) {
          entry.food.history = [];
        }
        entry.food.history.push({date, price: entry.price});
        this.foodService.saveFood(entry.food);
      });
      this.resetMenu();
      resolve('Étlap sikeresen mentve!');
    });
  }
}
