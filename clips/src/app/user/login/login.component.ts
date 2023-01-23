import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
credentials ={
  email:" ",
  password:" "
}
showAlert = false
alertMsg = "Please wait ! we  are logged you in."
alertColor = 'blue' 
inSubmission = false
constructor(private auth: AngularFireAuth){}
ngOnInit(): void{

}

async login(){
  this.showAlert= true
  this.alertMsg = "Please wait ! we  are loged in you "
  this.alertColor = 'blue' 
  this.inSubmission= true
try{
await this.auth.signInWithEmailAndPassword(
  this.credentials.email, this.credentials.password
)
}catch(e){
  this.inSubmission = false
  this.alertMsg = "something went wrong please try after some time"
  this.alertColor = 'red' 
  return 
}
this.alertMsg = "succed you are now logged in "
this.alertColor = 'green' 
}

}
