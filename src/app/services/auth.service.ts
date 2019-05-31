import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private authStatusSubject: BehaviorSubject<boolean>;
  public authStatus: Observable<boolean>;

  constructor(public afAuth: AngularFireAuth) {
    this.authStatusSubject = new BehaviorSubject<boolean>(afAuth.auth.currentUser !== null);
    this.authStatus = this.authStatusSubject.asObservable();
    afAuth.authState.subscribe(user => {
      this.authStatusSubject.next(user !== null);
    })
  }

  public isAuthenticated(): boolean {
    return this.authStatusSubject.value;
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
}
