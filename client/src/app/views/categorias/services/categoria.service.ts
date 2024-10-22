import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoriaEditada, CategoriaExcluida, CategoriaInserida, DetalhesCategoria, EditarCategoria, InserirCategoria, ListarCategorias } from '../models/categoria.models';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from '../../../core/auth/service/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {
  private readonly url = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  cadastrar(novaCategoria: InserirCategoria): Observable<CategoriaInserida> {
    return this.http.post<CategoriaInserida>(this.url, novaCategoria, this.obterHeadersDeAutorizacao());
  }

  editar(id: number, categoriaEditada: EditarCategoria): Observable<CategoriaEditada> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.put<CategoriaEditada>(urlCompleto, categoriaEditada, this.obterHeadersDeAutorizacao());
  }

  excluir(id: number): Observable<CategoriaExcluida> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.delete<CategoriaExcluida>(urlCompleto, this.obterHeadersDeAutorizacao());
  }

  selecionarTodos(): Observable<ListarCategorias[]> {
    const urlCompleto = `${this.url}`;
    return this.http.get<ListarCategorias[]>(urlCompleto, this.obterHeadersDeAutorizacao()).pipe(map(this.processarDados));
  }

  selecionarPorId(id: number): Observable<DetalhesCategoria> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;
    return this.http.get<DetalhesCategoria>(urlCompleto, this.obterHeadersDeAutorizacao()).pipe(map(this.processarDados));
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
