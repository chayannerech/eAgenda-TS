import { NgIf, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { DetalhesTarefaViewModel, TarefaExcluidaViewModel } from '../models/tarefa.models';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-excluir-tarefa',
  standalone: true,
  imports: [ NgIf, RouterLink, AsyncPipe, MatButtonModule, MatIconModule ],
  templateUrl: './excluir-tarefa.component.html'
})

export class ExcluirTarefaComponent {
  tarefa?: DetalhesTarefaViewModel;
  nomeDotarefa: string;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private tarefaService: TarefaService,
    private notificacao: NotificacaoService
  ) {
    this.nomeDotarefa = "";
  }

  ngOnInit(): void {
    this.tarefa = this.route.snapshot.data['tarefa'];
    this.nomeDotarefa = this.tarefa!.titulo;
  }

  excluir() {
    const id = this.route.snapshot.params['id'];
    if (!id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');

    const observer: PartialObserver<TarefaExcluidaViewModel> = {
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro)
    }

    this.tarefaService.excluir(id).subscribe(observer);
  }

  private processarSucesso() {
    this.notificacao.sucesso(
      `A tarefa '${this.nomeDotarefa}' foi excluída com sucesso!`
    );
    this.router.navigate(['/tarefas']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}
