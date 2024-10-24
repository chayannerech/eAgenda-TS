import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { LoginUsuarioViewModel, TokenViewModel } from '../../models/auth.models';
import { AuthService } from '../../service/auth.service';
import { UsuarioService } from '../../service/usuario.service';
import { catchError, tap, throwError } from 'rxjs';
import { NotificacaoService } from '../../../notificacao/notificacao.service';
import { LocalStorageService } from '../../service/local-storage.service';

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
  erroLogin: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService,
    private notificacao: NotificacaoService
  ) {
    this.erroLogin = '';
    this.form = this.fb.group({
      login: ['', [ Validators.required ]],
      senha: ['', [ Validators.required ]],
    });
  }

  get login() { return this.form.get('login'); }
  get senha() { return this.form.get('senha'); }

  public entrar() {
    console.clear();
    if (this.form.invalid) return;

    const usuarioLogin: LoginUsuarioViewModel = this.form.value;
    const observer = {
      next: (resposta: TokenViewModel) => this.processarSucesso(resposta),
      error: (erro: Error) => this.processarFalha(erro)
    }

    this.authService.login(usuarioLogin).subscribe(observer);
  }

  private processarSucesso(resposta: TokenViewModel) {
    this.erroLogin = '';
    this.usuarioService.logarUsuario(resposta.usuario);
    this.localStorageService.salvarTokenAutenticacao(resposta);
    this.notificacao.sucesso(`O usuário ${resposta.usuario.nome} está conectado!`);

    this.router.navigate(['/dashboard']);
  }

  private processarFalha(erro: Error) {
    this.erroLogin = erro.message;
    this.erroLogin = 'Login ou senha incorretos';
  }
}

