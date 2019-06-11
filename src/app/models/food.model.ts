export interface Food {
  id: string;
  name: string;
  type: FoodType;
  allergens: Array<string>;
  history: Array<{
    date: string;
    price: number;
  }>;
}

export enum FoodType {
  soup = 'Leves',
  main = 'Főétel',
  side = 'Köret',
  dessert = 'Desszert'
}
