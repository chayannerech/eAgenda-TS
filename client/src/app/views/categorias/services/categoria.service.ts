import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriaEditadaViewModel, CategoriaExcluidaViewModel, CategoriaInseridaViewModel, DetalhesCategoriaViewModel, EditarCategoriaViewModel, InserirCategoriaViewModel, ListarCategoriasViewModel } from '../models/categoria.models';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { processarDados, processarFalha, toTitleCase } from '../../../app.component';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {
  private readonly url = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) { }

  cadastrar(novaCategoria: InserirCategoriaViewModel): Observable<CategoriaInseridaViewModel> {
    novaCategoria.titulo = toTitleCase(novaCategoria.titulo);
    return this.http.post<CategoriaInseridaViewModel>(this.url, novaCategoria).pipe(map(processarDados), catchError(processarFalha));
  }

  editar(id: string, categoriaEditada: EditarCategoriaViewModel): Observable<CategoriaEditadaViewModel> {
    categoriaEditada.titulo = toTitleCase(categoriaEditada.titulo);
    const urlCompleto = `${this.url}/${id}`;
    return this.http.put<CategoriaEditadaViewModel>(urlCompleto, categoriaEditada).pipe(map(processarDados), catchError(processarFalha));
  }

  excluir(id: string): Observable<CategoriaExcluidaViewModel> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.delete<CategoriaExcluidaViewModel>(urlCompleto).pipe(map(processarDados), catchError(processarFalha));
  }

  selecionarTodos(): Observable<ListarCategoriasViewModel[]> {
    const urlCompleto = `${this.url}`;
    return this.http.get<ListarCategoriasViewModel[]>(urlCompleto).pipe(map(processarDados), catchError(processarFalha));
  }

  selecionarPorId(id: string): Observable<DetalhesCategoriaViewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;
    return this.http.get<DetalhesCategoriaViewModel>(urlCompleto).pipe(map(processarDados), catchError(processarFalha));
  }
}
