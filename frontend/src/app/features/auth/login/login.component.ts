import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { HttpStatus } from '../../../core/constants/http-status.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FloatLabelModule,
    MessageModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  loading = signal(false);
  errorMessage = signal<string | undefined>(undefined);
  submitted = signal(false);

  get f() { return this.form.controls; }

  submit() {
    this.submitted.set(true);
    if (this.form.invalid) return;

    this.loading.set(true);
    this.errorMessage.set(undefined);

    const { email, password } = this.form.value;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.loading.set(false);
        if (response.data.jwToken) {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(this.getErrorMessage(err));
      }
    });
  }

  private getErrorMessage(err: any): string {
    switch (err.status) {
      case HttpStatus.NETWORK_ERROR:
        return 'No se puede conectar al servidor. Verifique su conexión.';
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return 'Error del servidor. Intente más tarde.';
      case HttpStatus.UNAUTHORIZED:
        return err.error?.error || err.error?.message || 'Credenciales inválidas';
      case HttpStatus.BAD_REQUEST:
        return err.error?.error || err.error?.message || 'Datos de acceso incorrectos';
      default:
        return err.error?.error || err.error?.message || 'Error al iniciar sesión';
    }
  }
}
