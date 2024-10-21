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

  cadastrar(novaCategoria: InserirCategoria): Observable<CategoriaInserida> {
    return this.http.post<CategoriaInserida>(this.url, novaCategoria, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.apiKey  // Adiciona o header de autorização
      })
    });
  }

  editar(id: number, categoriaEditada: EditarCategoria): Observable<CategoriaEditada> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.put<CategoriaEditada>(urlCompleto, categoriaEditada);
  }

  excluir(id: number): Observable<CategoriaExcluida> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.delete<CategoriaExcluida>(urlCompleto);
  }

  selecionarTodos(): Observable<ListarCategorias[]> {
    const urlCompleto = `${this.url}?_expand=categoria`;
    return this.http.get<ListarCategorias[]>(urlCompleto, this.obterHeadersDeAutorizacao());
  }

  selecionarPorId(id: number): Observable<DetalhesCategoria> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.get<DetalhesCategoria>(urlCompleto);
  }

  private obterHeadersDeAutorizacao() {
    return {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: environment.apiKey,
      }
    }
  }
}
