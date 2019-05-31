import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
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
import { FoodsComponent } from './components/foods/foods.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatDialogModule,
  MatButtonToggleModule
} from '@angular/material';
import { HeaderComponent } from './components/header/header.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FoodDialogComponent } from './components/foods/food-dialog/food-dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    RouterModule.forRoot(ROUTES, { useHash: false }),
    BrowserAnimationsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonToggleModule
  ],
  declarations: [
    AppComponent,
    AuthComponent,
    FoodsComponent,
    HeaderComponent,
    FoodDialogComponent,
  ],
  entryComponents: [
    FoodDialogComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    AuthenticationService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class AppModule {}
