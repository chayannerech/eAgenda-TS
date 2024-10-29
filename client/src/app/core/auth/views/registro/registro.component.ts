import { NgIf, NgForOf, NgSwitch, NgSwitchCase, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { RegistrarUsuarioViewModel, TokenViewModel } from '../../models/auth.models';
import { UsuarioService } from '../../service/usuario.service';
import { NotificacaoService } from '../../../notificacao/notificacao.service';
import { PartialObserver } from 'rxjs';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    RouterLink,
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './registro.component.html',
})

export class RegistroComponent {
  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private notificacao: NotificacaoService,
    private localStorageService: LocalStorageService
  ) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$')      ]],
    });
  }

  get nome() { return this.form.get('nome'); }
  get login() { return this.form.get('login'); }
  get email() { return this.form.get('email'); }
  get senha() { return this.form.get('senha'); }

  public registrar() {
    if (this.form.invalid) return;

    const registro: RegistrarUsuarioViewModel = this.form.value;
    const observer: PartialObserver<TokenViewModel> = {
      next: (resposta) => this.processarSucesso(resposta),
      error: (erro) => this.processarFalha(erro)
    }

    this.authService.registrar(registro)
      .subscribe(observer);
  }

  private processarSucesso(resposta: TokenViewModel) {
    this.usuarioService.logarUsuario(resposta.usuario);
    this.localStorageService.salvarTokenAutenticacao(resposta);
    this.notificacao.sucesso(
      `O usuário ${resposta.usuario.nome} foi cadastrado com sucesso!`
    );

    this.router.navigate(['/dashboard']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}
