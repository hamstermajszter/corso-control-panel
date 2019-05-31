export class Food {
  id: string;
  name: string;
  type: FoodType;
  allergens: Array<string>;
}

export enum FoodType {
  soup = 'Leves',
  main = 'Főétel',
  side = 'Köret',
  dessert = 'Desszert'
}
