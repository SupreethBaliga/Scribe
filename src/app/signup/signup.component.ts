import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm: FormGroup;
  message: string = '';
  userError: any;
  passwordKey: string ; confirmPasswordKey: string;
  constructor(public fb: FormBuilder, public authservice: AuthService) {
    this.myForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });
   }

  checkIfPasswordsMatch() {
    if (this.passwordKey === this.confirmPasswordKey) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit(signupform) {
    let email: string = signupform.value.email;
    let password: string = signupform.value.password;
    let firstName: string = signupform.value.firstName;
    let lastName: string = signupform.value.lastName;

    this.authservice.signup(email, password, firstName, lastName).then((user: any) => {
      firebase.firestore().collection('users').doc(user.uid).set({
        firstName: signupform.value.firstName,
        lastName: signupform.value.lastName,
        email: signupform.value.email,
        photoURL: user.photoURL,
        interests: '',
        bio: '',
        hobbies: ''
      }).then(() => {
        this.message = 'You have signed up successfully. Please login.';
      });
    }).catch((error) => {
      console.log(error);
      this.userError = error;
    });
  }

  ngOnInit() {
  }

}
