import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { processarDados, processarFalha, toTitleCase } from '../../../app.component';
import { InserirDespesaViewModel, DespesaInseridaViewModel, EditarDespesaViewModel, DespesaEditadaViewModel, DespesaExcluidaViewModel, ListarDespesasViewModel, DetalhesDespesaViewModel } from '../models/despesa.models';

@Injectable({
  providedIn: 'root'
})

export class DespesaService {
  private readonly url = `${environment.apiUrl}/despesas`;

  constructor(private http: HttpClient) { }

  cadastrar(novaDespesa: InserirDespesaViewModel): Observable<DespesaInseridaViewModel> {
    return this.http
      .post<DespesaInseridaViewModel>(this.url, novaDespesa)
      .pipe(map(processarDados), catchError(processarFalha));
  }

  editar(id: string, despesaEditada: EditarDespesaViewModel): Observable<DespesaEditadaViewModel> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http
    .put<DespesaEditadaViewModel>(urlCompleto, despesaEditada)
    .pipe(map(processarDados), catchError(processarFalha));
  }

  excluir(id: string): Observable<DespesaExcluidaViewModel> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http
      .delete<DespesaExcluidaViewModel>(urlCompleto)
      .pipe(map(processarDados), catchError(processarFalha));
  }

  selecionarTodos(): Observable<ListarDespesasViewModel[]> {
    const urlCompleto = `${this.url}`;
    return this.http
      .get<ListarDespesasViewModel[]>(urlCompleto)
      .pipe(map(processarDados), catchError(processarFalha));
  }

  selecionarPorId(id: string): Observable<DetalhesDespesaViewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;
    return this.http
      .get<DetalhesDespesaViewModel>(urlCompleto)
      .pipe(map(processarDados), catchError(processarFalha));
  }
}
