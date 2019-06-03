import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Menu } from '@/models/menu.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuCollection: AngularFirestoreCollection<Menu>;
  currentMenu: BehaviorSubject<Menu>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.menuCollection = afs.collection<Menu>('menus');
    this.currentMenu = new BehaviorSubject(undefined);
  }

  createMenu(menu: Menu) {
    return this.menuCollection.add(menu);
  }
}
