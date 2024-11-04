import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { processarDados, processarFalha, toTitleCase } from '../../../app.component';
import { DetalhesTarefaViewModel, EditarTarefaViewModel, InserirTarefaViewModel, ListarTarefasViewModel, TarefaEditadaViewModel, TarefaExcluidaViewModel, TarefaInseridaViewModel } from '../models/tarefa.models';

@Injectable({
  providedIn: 'root'
})

export class TarefaService {
  private readonly url = `${environment.apiUrl}/tarefas`;

  constructor(private http: HttpClient) { }

  cadastrar(novaTarefa: InserirTarefaViewModel): Observable<TarefaInseridaViewModel> {
    this.formatarTarefa(novaTarefa);

    return this.http
      .post<TarefaInseridaViewModel>(this.url, novaTarefa)
      .pipe(map(processarDados), catchError(processarFalha));
  }

  editar(id: string, tarefaEditada: EditarTarefaViewModel): Observable<TarefaEditadaViewModel> {
    const urlCompleto = `${this.url}/${id}`;
    this.formatarTarefa(tarefaEditada);

    return this.http
      .put<TarefaEditadaViewModel>(urlCompleto, tarefaEditada)
      .pipe(map(processarDados), catchError(processarFalha));
  }

  excluir(id: string): Observable<TarefaExcluidaViewModel> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .delete<TarefaExcluidaViewModel>(urlCompleto)
      .pipe(map(processarDados), catchError(processarFalha));
  }

  selecionarTodos(): Observable<ListarTarefasViewModel[]> {
    return this.http
      .get<ListarTarefasViewModel[]>(this.url)
      .pipe(map(processarDados), catchError(processarFalha));
  }

  selecionarPorId(id: string): Observable<DetalhesTarefaViewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;
    return this.http
    .get<DetalhesTarefaViewModel>(urlCompleto)
    .pipe(map(processarDados), catchError(processarFalha));
  }

  private formatarTarefa(tarefa: any) {
    tarefa.titulo = toTitleCase(tarefa.titulo);

    if (tarefa.prioridade == 0)
      tarefa.prioridade = 0;
    else if (tarefa.prioridade == 1)
      tarefa.prioridade = 1;
    else
      tarefa.prioridade = 2;
  }
}
