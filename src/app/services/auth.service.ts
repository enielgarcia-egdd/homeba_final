import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }


  async resetPaswword(email: string): Promise<void> {
    try{
      return this.afAuth.sendPasswordResetEmail(email);
    }
    catch(error){
      console.log('Error-->', error);
    }
  }
  async loginGoogle(): Promise<User> {
    try {
      const {user} = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    }
    catch(error){
      console.log('Error-->', error);
    }
   }

  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerificationEmail();
      return user;
    }
    catch (error) {
      console.log('Error-->', error);
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      return user;
    }
    catch (error) {
      // console.log('Error-->', error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    try{
      return (await this.afAuth.currentUser).sendEmailVerification();
    }
    catch(error){
      console.log('Error-->', error);
    }
  }

  isEmailVerified(user: User): boolean{
    return user.emailVerified === true ? true : false;
  }

  async logout(): Promise<void> {
    try {
      this.afAuth.signOut();
    }
    catch (error) {
      console.log('Error-->', error);
    }
  }

  updateUserData(user: User){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName
    };
     return userRef.set(data, {merge: true} );
  }
}


