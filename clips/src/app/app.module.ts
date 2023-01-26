import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { UserModule } from './user/user.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';

import {AngularFireModule, FIREBASE_OPTIONS} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFireStorageModule} from '@angular/fire/compat/storage'
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ClipComponent } from './clip/clip.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CliplistComponent } from './cliplist/cliplist.component';
import { FbTimestampPipe } from './pipes/fb-timestamp.pipe'
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    ClipComponent,
    NotFoundComponent,
    CliplistComponent,
    FbTimestampPipe 
  ],
  imports: [
    BrowserModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

    AppRoutingModule,
    AngularFireStorageModule
 ],
  providers:[
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
