import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from '../../../core/auth/service/local-storage.service';
import { CompromissoEditado, CompromissoExcluido, CompromissoInserido, DetalhesCompromisso, EditarCompromisso, InserirCompromisso, ListarCompromissos } from '../models/compromisso.models';

@Injectable({
  providedIn: 'root'
})

export class CompromissoService {
  private readonly url = `${environment.apiUrl}/compromissos`;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  cadastrar(novoCompromisso: InserirCompromisso): Observable<CompromissoInserido> {
    return this.http.post<CompromissoInserido>(this.url, novoCompromisso, this.obterHeadersDeAutorizacao());
  }

  editar(id: number, CompromissoEditada: EditarCompromisso): Observable<CompromissoEditado> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.put<CompromissoEditado>(urlCompleto, CompromissoEditada, this.obterHeadersDeAutorizacao());
  }

  excluir(id: number): Observable<CompromissoExcluido> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.delete<CompromissoExcluido>(urlCompleto, this.obterHeadersDeAutorizacao());
  }

  selecionarTodos(): Observable<ListarCompromissos[]> {
    const urlCompleto = `${this.url}`;
    return this.http.get<ListarCompromissos[]>(urlCompleto, this.obterHeadersDeAutorizacao()).pipe(map(this.processarDados));
  }

  selecionarPorId(id: number): Observable<DetalhesCompromisso> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;
    return this.http.get<DetalhesCompromisso>(urlCompleto, this.obterHeadersDeAutorizacao()).pipe(map(this.processarDados));
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
