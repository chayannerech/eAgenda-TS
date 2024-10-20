import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map, Observable, throwError } from "rxjs";
import { RegistrarUsuarioViewModel, TokenViewModel } from "../models/auth.models";

@Injectable()
export class AuthService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public registrar(registro: RegistrarUsuarioViewModel): Observable<TokenViewModel> {
    const urlCompleto = `${this.apiUrl}/contas/registrar`;

    return this.http
      .post<TokenViewModel>(urlCompleto, registro)
      .pipe(map(this.processarDados));
  }

  private processarDados(resposta: any): TokenViewModel {
    if (resposta.sucesso) return resposta.dados;

    throw new Error('Erro ao mapear token do usuário.');
  }
}
