import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import IUser from '../models/user.model';
import {Observable} from 'rxjs'
import{ delay , map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})

export class AuthService {
private usersCollection: AngularFirestoreCollection<IUser>
public isAuthenticated$: Observable<boolean>
public isAuthenticatedWithDelay$: Observable<boolean>
constructor(private auth: AngularFireAuth,
    private db :AngularFirestore
    ) {
      this.usersCollection = db.collection('users')
      auth.user.subscribe(console.log)
      this.isAuthenticated$ = auth.user.pipe(
       map(user => !!user)
      
       )
       this.isAuthenticatedWithDelay$= this.isAuthenticated$.pipe(
        delay(1000)
       )
     }
  public async createUser(userDate:IUser){
    if(!userDate.password){
      throw new Error("Password not provided")
    }
    const userCred = await this.auth.createUserWithEmailAndPassword(
      userDate.email, userDate.password 
    )
    if(!userCred.user){
      throw new Error(" User can't be fount")
    }
 await this.usersCollection.doc(userCred.user.uid).set({
      name:userDate.name,
      email: userDate.email,
      age: userDate.age,
      phoneNumber:userDate.phoneNumber
    })

   await userCred.user.updateProfile({
      displayName:userDate.name
    })
 
  }
}
