import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { AuthComponent } from './components/auth/auth.component';
import { FoodComponent } from './components/food/food.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    RouterModule.forRoot(ROUTES, { useHash: false }),
  ],
  declarations: [
    AppComponent,
    AuthComponent,
    FoodComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    AuthService,
    AuthGuardService
  ]
})
export class AppModule {}
