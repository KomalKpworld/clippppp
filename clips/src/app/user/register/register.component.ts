import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
//for valdation 
export class RegisterComponent {
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email = new FormControl('',[
    Validators.required,
    Validators.email
  ])
  age = new FormControl('',[
    Validators.required,
    Validators.min(4),
    Validators.max(13)

  ])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
  ])
  confirm_password = new FormControl('', [
    Validators.required,
  ])
  phoneNumber = new FormControl('',[
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10)
  ])
  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber


  })
  showAlert = false
alertMsg = "Please wait ! Your Account is Created "
alertColor = 'blue'
  register(){
   this.showAlert = true,
    this.alertMsg ="Please wait ! Your Account is Created "
    this.alertColor = 'blue'
  }
 
  
 
}
