import { Component, OnInit } from '@angular/core';
import { Food, FoodType } from '@/models/food.model';
import * as _ from 'lodash';
import { MenuService } from '@/services/menu.service';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { MatTableDataSource, MatSnackBar } from '@angular/material';

export interface MenuEntry {
  food: Food;
  price: number;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  date = new FormControl(moment());
  minDate = moment();
  displayedColumns: string[] = ['name', 'price', 'delete'];
  dataSource: MatTableDataSource<any>;
  foodTypes = _.zipWith(Object.keys(FoodType), Object.values(FoodType), (key, value) => {
    return {key, value};
  });
  menu: Array<{foodType: {key: string, value: string}, entries: Array<MenuEntry>}>;

  constructor(
    private menuService: MenuService,
    private snackBar: MatSnackBar
  ) {
    this.menuService.entries$.subscribe(() => this.refresh());
  }

  ngOnInit(): void {
    this.menuService.entries$.subscribe((menuEntries: Array<MenuEntry>) => {
      this.menu = [];
      _.map(this.foodTypes, foodType => {
        const entriesWithSameType = _.filter(menuEntries, entry => entry.food.type === foodType.key);
        this.menu.push({foodType, entries: entriesWithSameType});
      });
    });
  }

  saveMenu() {
    this.menuService.saveMenu(this.date.value.format('YYYYMMDD')).then(message => {
      this.snackBar.open(message, '', {
        duration: 5000
      });
    });
  }

  refresh() {
    this.dataSource = new MatTableDataSource(this.menuService.entries$.value);
  }

  dateChange(event) {
    console.log(moment().isBefore(event.value));

  }

  fromNow(date: string) {
    return moment(date, 'YYYYMMDD').fromNow();
  }

}
