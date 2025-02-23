import { Component, inject } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputMaskModule,
    PasswordModule,
    ButtonModule,
  ],
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
