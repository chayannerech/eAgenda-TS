import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { LoginUsuarioViewModel, RegistrarUsuarioViewModel, TokenViewModel } from "../models/auth.models";

@Injectable()
export class AuthService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public registrar(registro: RegistrarUsuarioViewModel): Observable<TokenViewModel> {
    const urlCompleto = `${this.apiUrl}/contas/registrar`;

    return this.http
      .post<TokenViewModel>(urlCompleto, registro)
      .pipe(
        map(this.processarDados),
        catchError(this.processarFalha)
      );
  }

  public login(usuarioLogin: LoginUsuarioViewModel): Observable<TokenViewModel> {
    const urlCompleto = `${this.apiUrl}/contas/autenticar`;

    return this.http
    .post<TokenViewModel>(urlCompleto, usuarioLogin)
    .pipe (
      map(this.processarDados),
      catchError(this.processarFalha)
    );
  }

  public logout() {
    const urlCompleto = `${this.apiUrl}/contas/sair`;
    return this.http.post(urlCompleto, {});
  }

  public validarExpiracaoDoToken(dataExpiracao: Date): boolean {
    return dataExpiracao > new Date();
  }

  private processarDados(resposta: any): TokenViewModel {
    if (resposta.sucesso) return resposta.dados;
    throw new Error('Erro ao mapear token do usuário');
  }

  private processarFalha(resposta: any) {
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}
