import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import IUser from '../models/user.model';
import {Observable, of} from 'rxjs'
import{ delay , map,filter, switchMap } from 'rxjs/operators';
import { ActivatedRoute,NavigationEnd} from '@angular/router';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
private usersCollection: AngularFirestoreCollection<IUser>
public isAuthenticated$: Observable<boolean>
public isAuthenticatedWithDelay$: Observable<boolean>
private redirect = false
constructor(
  private auth: AngularFireAuth,
  private db :AngularFirestore,
  private router:Router,
  private route:ActivatedRoute
    ) {
      this.usersCollection = db.collection('users')
      auth.user.subscribe()
      this.isAuthenticated$ = auth.user.pipe(
       map(user => !!user)
      
       )
       this.isAuthenticatedWithDelay$= this.isAuthenticated$.pipe(
        delay(1000)
       )
  this.router.events.pipe(
    filter(e=> e instanceof NavigationEnd),
    map(e=> this.route.firstChild),
    switchMap(route => route?.data ?? of({}))
    ).subscribe(data =>{
      this.redirect = data['authOnly'] ?? false
    }

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
