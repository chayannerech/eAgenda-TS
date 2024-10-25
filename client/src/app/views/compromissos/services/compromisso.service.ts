import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from '../../../core/auth/service/local-storage.service';
import { CompromissoEditadoViewModel, CompromissoExcluidoViewModel, CompromissoInseridoViewModel, DetalhesCompromissoViewModel, EditarCompromissoViewModel, InserirCompromissoViewModel, ListarCompromissosViewModel } from '../models/compromisso.models';
import { processarDados, processarFalha, toTitleCase } from '../../../app.component';

@Injectable({
  providedIn: 'root'
})

export class CompromissoService {
  private readonly url = `${environment.apiUrl}/compromissos`;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  cadastrar(novoCompromisso: InserirCompromissoViewModel): Observable<CompromissoInseridoViewModel> {
    this.formatarCompromisso(novoCompromisso);
    this.formatarTipoDeLocal(novoCompromisso);

    return this.http
      .post<CompromissoInseridoViewModel>(this.url, novoCompromisso)
      .pipe(map(processarDados), catchError(processarFalha));
  }

  editar(id: string, compromissoEditado: EditarCompromissoViewModel): Observable<CompromissoEditadoViewModel> {
    const urlCompleto = `${this.url}/${id}`;
    this.formatarCompromisso(compromissoEditado);
    this.formatarTipoDeLocal(compromissoEditado);

    return this.http
    .put<CompromissoEditadoViewModel>(urlCompleto, compromissoEditado)
    .pipe(map(processarDados), catchError(processarFalha));
  }

  excluir(id: string): Observable<CompromissoExcluidoViewModel> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http
      .delete<CompromissoExcluidoViewModel>(urlCompleto)
      .pipe(map(processarDados), catchError(processarFalha));
  }

  selecionarTodos(): Observable<ListarCompromissosViewModel[]> {
    const urlCompleto = `${this.url}`;
    return this.http
      .get<ListarCompromissosViewModel[]>(urlCompleto)
      .pipe(map(processarDados), catchError(processarFalha));
  }

  selecionarPorId(id: string): Observable<DetalhesCompromissoViewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;
    return this.http
      .get<DetalhesCompromissoViewModel>(urlCompleto)
      .pipe(map(processarDados), catchError(processarFalha));
  }

  formatarHorario(horario: string): string {
    return horario.split('', 5).join('');
  }

  private formatarCompromisso(compromisso: any) {
    compromisso.assunto = toTitleCase(compromisso.assunto);
    if (compromisso.local)
      compromisso.local = toTitleCase(compromisso.local);
  }

  private formatarTipoDeLocal(compromisso: any) {
    if (compromisso.tipoLocal == 0) compromisso.tipoLocal = 0;
    else
      compromisso.tipoLocal = 1;
  }
}
