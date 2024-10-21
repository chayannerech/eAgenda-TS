import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoriaEditada, CategoriaExcluida, CategoriaInserida, DetalhesCategoria, EditarCategoria, InserirCategoria, ListarCategorias } from '../models/categoria.models';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly url = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) { }

  cadastrar(novaCategoria: InserirCategoria, chaveDeAcesso: string): Observable<CategoriaInserida> {
    return this.http.post<CategoriaInserida>(this.url, novaCategoria, this.obterHeadersDeAutorizacao(chaveDeAcesso));
  }

  editar(id: number, categoriaEditada: EditarCategoria, chaveDeAcesso: string): Observable<CategoriaEditada> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.put<CategoriaEditada>(urlCompleto, categoriaEditada, this.obterHeadersDeAutorizacao(chaveDeAcesso));
  }

  excluir(id: number, chaveDeAcesso: string): Observable<CategoriaExcluida> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.delete<CategoriaExcluida>(urlCompleto, this.obterHeadersDeAutorizacao(chaveDeAcesso));
  }

  selecionarTodos(chaveDeAcesso: string): Observable<ListarCategorias[]> {
    const urlCompleto = `${this.url}?_expand=categoria`;
    return this.http.get<ListarCategorias[]>(urlCompleto, this.obterHeadersDeAutorizacao(chaveDeAcesso));
  }

  selecionarPorId(id: number, chaveDeAcesso: string): Observable<DetalhesCategoria> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.get<DetalhesCategoria>(urlCompleto, this.obterHeadersDeAutorizacao(chaveDeAcesso));
  }

  private obterHeadersDeAutorizacao(chaveDeAcesso: string) {
    return {
      method: 'GET',
      headers: {
        accept: 'application/json',
        //Authorization: chaveDeAcesso,
        Authorization: environment.apiKey,
      }
    }
  }
}
