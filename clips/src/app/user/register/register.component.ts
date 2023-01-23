import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import IUser from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterValidators } from '../validators/register-validators';
import { Emailtaken } from '../validators/emailtaken';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
//for valdation 
export class RegisterComponent {
 constructor(
  private auth: AuthService,
 private emailTaken: Emailtaken
 ) {}
inSubmission = false
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ],[this.emailTaken.validate])
  age = new FormControl<number|null>(null, [
    Validators.required,
    Validators.min(4),
    Validators.max(13)

  ])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
  ])
  confirm_password = new FormControl('', [
    Validators.required,
  ])
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10)
  ])
  showAlert = false
  alertMsg = "Please wait ! Your Account is Created "
  alertColor = 'blue' 
  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber
  }, [RegisterValidators.match('password', 'confirm_password')])
 
  async register() {
    this.showAlert = true,
    this.alertMsg = "Please wait ! Your Account is Created "
    this.alertColor = 'blue'
    this.inSubmission = true
    try {
   await this.auth.createUser(this.registerForm.value as IUser)
    } catch (e) {
      console.error(e)
      this.alertMsg = 'An unexpected error occure . Please try again'
      this.alertColor = 'red'
      return
    }
    this.alertMsg = 'Your Accounr is created succesfully'
    this.alertColor = 'blue'
    this.inSubmission= false
  }
}


