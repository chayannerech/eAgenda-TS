import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { LoginUsuarioViewModel } from '../../models/auth.models';
import { AuthService } from '../../service/auth.service';
import { UsuarioService } from '../../service/usuario.service';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
})

export class LoginComponent {
  form: FormGroup;
  erroLogin: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private usuarioService: UsuarioService) {
    this.form = this.fb.group({
      login: ['', [ Validators.required ]],
      senha: ['', [ Validators.required ]],
    });
  }

  get login() { return this.form.get('login'); }
  get senha() { return this.form.get('senha'); }

  public entrar() {
    if (this.form.invalid) return;
    const usuarioLogin: LoginUsuarioViewModel = this.form.value;

    this.authService.entrar(usuarioLogin)
    .pipe(
      catchError(() => {
        this.erroLogin = true;
        return throwError(() => new Error('Autenticação falhou')); // Retorna um erro corretamente
      })
    )
    .subscribe(resposta => {
        this.erroLogin = false;
        console.clear();
        this.usuarioService.logarUsuario(resposta.usuario);
        this.router.navigate(['/dashboard']);
      }
    );
  }
}

