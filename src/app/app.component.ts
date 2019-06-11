import { Component } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/hu';
moment.locale('hu');

export interface Item { id: string; name: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
