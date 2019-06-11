import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Menu } from '@/models/menu.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '@/models/food.model';
import * as _ from 'lodash';
import { FoodService } from './food.service';
import * as moment from 'moment';

export interface MenuEntry {
  food: Food;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuCollection: AngularFirestoreCollection<Menu>;
  entries$: BehaviorSubject<Array<MenuEntry>>;

  constructor(
    private afs: AngularFirestore,
    private foodService: FoodService
  ) {
    this.menuCollection = afs.collection<Menu>('menus');
    this.entries$ = new BehaviorSubject(JSON.parse(localStorage.getItem('unsavedMenu')) || []);
    this.entries$.subscribe(entries => localStorage.setItem('unsavedMenu', JSON.stringify(entries)));
  }

  addFood(food: Food): Promise<string> {
    return new Promise((resolve, reject) => {
      const foods: Array<Food> = _.map(this.entries$.value, entry => entry.food);
      if (!_.includes(foods, food)) {
        this.entries$.value.push({food, price: 0});
        this.entries$.next(this.entries$.value);
        resolve(`${food.name} hozzá lett adva az étlaptervhez!`);
      } else {
        reject(`${food.name} már az étlaptervben van!`);
      }
    });
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
      if (moment().isBefore(date)) {
        this.menuCollection.doc(date).set({entries: this.entries$.value});
        _.map(this.entries$.value, entry => {
          if (!entry.food.history) {
            entry.food.history = [];
          }
          entry.food.history.push({date, price: entry.price});
          this.foodService.saveFood(entry.food);
        });
        this.resetMenu();
        resolve('Étlap sikeresen mentve!');
      }
    });
  }
}
