import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {
  private authStatus: boolean;

  constructor(public afAuth: AngularFireAuth) {}

  public isAuthenticated(): boolean {
    console.log(this.authStatus);
    return this.authStatus;
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => this.authStatus = true);
    }
  logout() {
    this.afAuth.auth.signOut().then(() => this.authStatus = false);
  }
}
