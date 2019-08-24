import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import * as _ from 'lodash';
import { FoodType } from '@/models/food.model';
import { Allergen } from '../foods.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  form: FormGroup;
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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initFilterForm();
  }

  initFilterForm() {
    this.form = this.formBuilder.group({
      type: new FormControl(),
      allergens: new FormArray([])
    });
    const allergens = this.form.get('allergens') as FormArray;
    _.map(this.allergens, allergen => {
      const allergenFormControl = this.formBuilder.group({
        id: allergen.id,
        displayedName: allergen.name,
        selected: new FormControl(false)
      });
      allergens.push(allergenFormControl);
    });
  }
}
