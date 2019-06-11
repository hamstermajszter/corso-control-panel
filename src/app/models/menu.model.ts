import { Food } from './food.model';

export class Menu {
  id: string;
  entries: Array<MenuEntry>;
}

export class MenuEntry {
  food: Food;
  price: number;
}
