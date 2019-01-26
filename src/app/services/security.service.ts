import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthProvider, GoogleAuthProvider, UserCredential } from 'firebase/auth';

import { User } from "../models/user";

@Injectable()
export class SecurityService {

  user: Observable<User | null>;

  constructor(private readonly ngFireAuth: AngularFireAuth,
    private readonly ngFirestore: AngularFirestore,
    private readonly router: Router) {

    this.user = this.ngFireAuth.authState.pipe(
      switchMap((userInfo) => userInfo ? this.ngFirestore.doc<User>(`users/${userInfo.uid}`).valueChanges()
        : of(null)));
  }

  emailLogin(email: string, password: string) {
    return this.ngFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => this.updateUserData(user))
      .catch((error) => this.handleError(error));
  }

  googleLogin() {
    return this.oAuthLogin(new GoogleAuthProvider());
  }

  signOut() {
    this.ngFireAuth.auth.signOut().then(() => this.router.navigate(['/']));
  }

  private oAuthLogin(provider: AuthProvider) {
    return this.ngFireAuth.auth.signInWithPopup(provider)
      .then((credential) => this.updateUserData(credential.user))
      .catch((error) => this.handleError(error));
  }

  private handleError(error: Error) {
    console.error(error);
  }

  private updateUserData(userCredential: UserCredential) {

    const userDocument: AngularFirestoreDocument<User> = this.ngFirestore.doc(`users/${userCredential.uid}`);

    const data: User = {
      id: userCredential.uid,
      email: userCredential.email,
      fullname: userCredential.displayName || 'nameless user'
    };

    return userDocument.set(data);
  }
}
