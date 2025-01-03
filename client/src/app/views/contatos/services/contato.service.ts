import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ContatoEditadoViewModel, ContatoExcluidoViewModel, ContatoInseridoViewModel, DetalhesContatoViewModel, EditarContatoViewModel, InserirContatoViewModel, ListarContatosViewModel } from '../models/contato.models';
import { processarDados, processarFalha, toTitleCase } from '../../../app.component';

@Injectable({
  providedIn: 'root'
})

export class ContatoService {
  private readonly url = `${environment.apiUrl}/contatos`;

  constructor(private http: HttpClient) { }

  cadastrar(novoContato: InserirContatoViewModel): Observable<ContatoInseridoViewModel> {
    this.formatarContato(novoContato);

    return this.http
      .post<ContatoInseridoViewModel>(this.url, novoContato)
      .pipe(map(processarDados), catchError(processarFalha));
  }

  editar(id: string, contatoEditado: EditarContatoViewModel): Observable<ContatoEditadoViewModel> {
    const urlCompleto = `${this.url}/${id}`;
    this.formatarContato(contatoEditado)

    return this.http
      .put<ContatoEditadoViewModel>(urlCompleto, contatoEditado)
      .pipe(map(processarDados), catchError(processarFalha));
  }

  excluir(id: string): Observable<ContatoExcluidoViewModel> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .delete<ContatoExcluidoViewModel>(urlCompleto)
      .pipe(map(processarDados), catchError(processarFalha));
  }

  selecionarTodos(): Observable<ListarContatosViewModel[]> {
    return this.http
      .get<ListarContatosViewModel[]>(this.url)
      .pipe(map(processarDados), catchError(processarFalha));
  }

  selecionarPorId(id: string): Observable<DetalhesContatoViewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;
    return this.http
    .get<DetalhesContatoViewModel>(urlCompleto)
    .pipe(map(processarDados), catchError(processarFalha));
  }

  formatarContato(contato: any) {
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
