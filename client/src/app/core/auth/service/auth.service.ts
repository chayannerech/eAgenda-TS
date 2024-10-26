import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";
import { LoginUsuarioViewModel, RegistrarUsuarioViewModel, TokenViewModel } from "../models/auth.models";
import { processarDados, processarFalha } from "../../../app.component";

@Injectable()
export class AuthService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public registrar(registro: RegistrarUsuarioViewModel): Observable<TokenViewModel> {
    const urlCompleto = `${this.apiUrl}/contas/registrar`;

    return this.http
      .post<TokenViewModel>(urlCompleto, registro)
      .pipe(map(processarDados), catchError(processarFalha));
  }

  public login(usuarioLogin: LoginUsuarioViewModel): Observable<TokenViewModel> {
    const urlCompleto = `${this.apiUrl}/contas/autenticar`;

    return this.http
    .post<TokenViewModel>(urlCompleto, usuarioLogin)
    .pipe (map(processarDados), catchError(processarFalha));
  }

  public logout() {
    const urlCompleto = `${this.apiUrl}/contas/sair`;
    return this.http.post(urlCompleto, {});
  }

  public validarExpiracaoDoToken(dataExpiracao: Date): boolean {
    return dataExpiracao > new Date();
  }
}
