import { NgIf } from '@angular/common';
import { Component, input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { doesEmailExist } from 'supertokens-web-js/recipe/emailpassword';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoggingIn = false;
  errorMessage = '';
  loginForm: FormGroup;
  returnUrl = input<string>('');

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async checkEmail() {
    console.log('Checking email...');

    const email = this.loginForm.value.email;

    try {
      let response = await doesEmailExist({
        email,
      });

      if (response.doesExist) {
        console.error('Email already exists. Please sign in instead');
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        console.error(err.message);
      } else {
        console.error('Oops! Something went wrong.');
      }
    }
  }

  onSubmit() {
    this.isLoggingIn = true;
    const values = this.loginForm.value;

    const credentials = {
      formFields: [
        {
          id: 'email',
          value: values.email,
        },
        {
          id: 'password',
          value: values.password,
        },
        {
          id: 'first_name',
          value: 'John Doe',
        },
      ],
    };

    console.log(credentials);
  }
}
