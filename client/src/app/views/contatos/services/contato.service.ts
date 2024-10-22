import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from '../../../core/auth/service/local-storage.service';
import { ContatoEditado, ContatoExcluido, ContatoInserido, DetalhesContato, EditarContato, InserirContato, ListarContatos } from '../models/contato.models';

@Injectable({
  providedIn: 'root'
})

export class ContatoService {
  private readonly url = `${environment.apiUrl}/contatos`;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  cadastrar(novaContato: InserirContato): Observable<ContatoInserido> {
    return this.http.post<ContatoInserido>(this.url, novaContato, this.obterHeadersDeAutorizacao());
  }

  editar(id: number, ContatoEditada: EditarContato): Observable<ContatoEditado> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.put<ContatoEditado>(urlCompleto, ContatoEditada, this.obterHeadersDeAutorizacao());
  }

  excluir(id: number): Observable<ContatoExcluido> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.delete<ContatoExcluido>(urlCompleto, this.obterHeadersDeAutorizacao());
  }

  selecionarTodos(): Observable<ListarContatos[]> {
    const urlCompleto = `${this.url}`;
    return this.http.get<ListarContatos[]>(urlCompleto, this.obterHeadersDeAutorizacao()).pipe(map(this.processarDados));
  }

  selecionarPorId(id: number): Observable<DetalhesContato> {
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
    throw new Error();
  }
}
