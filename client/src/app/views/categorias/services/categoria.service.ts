import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.post<CategoriaInserida>(this.url, novaCategoria);
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
    return this.http.get<ListarCategorias[]>(this.url);
  }

  selecionarPorId(id: number): Observable<DetalhesCategoria> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.get<DetalhesCategoria>(urlCompleto);
  }
}
