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
  private readonly url = `${environment.apiUrl}/contatos`;

  constructor(private http: HttpClient) { }

  cadastrar(novoTarefa: InserirTarefaViewModel): Observable<TarefaInseridaViewModel> {
    this.formatarTarefa(novoTarefa);

    return this.http
      .post<TarefaInseridaViewModel>(this.url, novoTarefa)
      .pipe(map(processarDados), catchError(processarFalha));
  }

  editar(id: string, contatoEditado: EditarTarefaViewModel): Observable<TarefaEditadaViewModel> {
    const urlCompleto = `${this.url}/${id}`;
    this.formatarTarefa(contatoEditado)

    return this.http
      .put<TarefaEditadaViewModel>(urlCompleto, contatoEditado)
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

  formatarTarefa(contato: any) {
    contato.nome = toTitleCase(contato.nome);
    contato.empresa = toTitleCase(contato.empresa);
    contato.cargo = toTitleCase(contato.cargo);
    contato.telefone = this.formatarTelefone(contato.telefone);
  }

  removerFormatacaoTelefone(telefone: string): string {
    return telefone.replace(/\D/g, '');
  }

  private formatarTelefone(telefone: string): string {
    const ddd = telefone.slice(0, 2);
    const parte1 = telefone.slice(2, 7);
    const parte2 = telefone.slice(7, 11);
    return `(${ddd}) ${parte1}-${parte2}`;
  }
}
