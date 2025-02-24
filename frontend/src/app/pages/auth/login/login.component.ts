import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  fb = inject(FormBuilder);

  loginForm = this.fb.group({
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  hasError = !this.loginForm.valid;

  onSubmit() {
    if (this.hasError) {
      console.log(this.loginForm.value);
    }
  }
}
