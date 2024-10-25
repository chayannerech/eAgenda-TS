import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ShellComponent } from "./core/shell/shell.component";
import { Observable, throwError } from 'rxjs';
import { UsuarioTokenViewModel } from './core/auth/models/auth.models';
import { AsyncPipe } from '@angular/common';
import { UsuarioService } from './core/auth/service/usuario.service';
import { LocalStorageService } from './core/auth/service/local-storage.service';
import { AuthService } from './core/auth/service/auth.service';
import { NotificacaoService } from './core/notificacao/notificacao.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, ShellComponent],
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit{
  usuarioAuthenticado$?: Observable<UsuarioTokenViewModel | undefined>

  constructor(
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService,
    private notificacao: NotificacaoService,
  ) {}

  ngOnInit(): void {
    this.usuarioAuthenticado$ = this.usuarioService.usuarioAutenticado;
    const token = this.localStorageService.obterTokenAutenticacao();

    if (!token) return;

    const usuario = token.usuario;
    const dataExpiracao = new Date(token.dataExpiracao);

    const tokenValido: boolean = this.authService.validarExpiracaoDoToken(dataExpiracao);

    if (usuario && tokenValido)
      this.usuarioService.logarUsuario(usuario);
    else
      this.efetuarLogout();
  }

  efetuarLogout() {
    this.authService.logout();
    this.usuarioService.logout();
    this.localStorageService.limparDadosLocais();
    this.notificacao.sucesso(`Logout efetuado!`);

    this.router.navigate(['/login']);
  }
}

export function toTitleCase(nomeRecebido: string) {
  const nomeSeparado = nomeRecebido.split('');
  const primeiraLetra = nomeSeparado[0].toUpperCase();
  nomeSeparado[0] = primeiraLetra;

  return nomeRecebido = nomeSeparado.join('');
}

export function processarDados(resposta: any) {
  if (resposta.sucesso) return resposta.dados;
  throw new Error("Erro ao mapear dados requisitados");
}

export function processarFalha(resposta: any) {
  return throwError(() => new Error(resposta.error.erros[0]));
}
