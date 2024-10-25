import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from '../../../core/auth/service/local-storage.service';
import { ContatoEditado, ContatoExcluido, ContatoInserido, DetalhesContato, EditarContato, InserirContato, ListarContatosViewModel } from '../models/contato.models';

@Injectable({
  providedIn: 'root'
})

export class ContatoService {
  private readonly url = `${environment.apiUrl}/contatos`;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  cadastrar(novoContato: InserirContato): Observable<ContatoInserido> {
    return this.http.post<ContatoInserido>(this.url, novoContato, this.obterHeadersDeAutorizacao());
  }

  editar(id: string, ContatoEditada: EditarContato): Observable<ContatoEditado> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.put<ContatoEditado>(urlCompleto, ContatoEditada, this.obterHeadersDeAutorizacao());
  }

  excluir(id: string): Observable<ContatoExcluido> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.delete<ContatoExcluido>(urlCompleto, this.obterHeadersDeAutorizacao());
  }

  selecionarTodos(): Observable<ListarContatosViewModel[]> {
    const urlCompleto = `${this.url}`;
    return this.http
      .get<ListarContatosViewModel[]>(urlCompleto, this.obterHeadersDeAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  selecionarPorId(id: string): Observable<DetalhesContato> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;
    return this.http.get<DetalhesContato>(urlCompleto, this.obterHeadersDeAutorizacao()).pipe(map(this.processarDados));
  }

  private obterHeadersDeAutorizacao() {
    const chave = this.localStorageService.obterTokenAutenticacao()?.chave ?? "";

    return {
      headers: new HttpHeaders( {
        accept: 'application/json',
        Authorization: `Bearer ${chave}`
      })
    }
  }

  private processarDados(resposta: any) {
    if (resposta.sucesso) return resposta.dados;
    throw new Error("Erro ao mapear dados requisitados");
  }

  processarFalha(resposta: any) {
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}
