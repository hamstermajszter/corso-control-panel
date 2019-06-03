import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FoodService } from '@/services/food.service';
import { FoodType } from '@/models/food.model';
import * as _ from 'lodash';
import { Menu } from '@/models/menu.model';
import { MenuService } from '@/services/menu.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  date = new FormControl(moment());
  foodTypes = _.zipWith(Object.keys(FoodType), Object.values(FoodType), (key, value) => {
    return {key, value};
  });

  constructor(
    private menuService: MenuService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

  }

  dateChange(event) {
    console.log(event);

  }

}
