import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { DetalhesTarefaViewModel, TarefaExcluidaViewModel } from '../models/tarefa.models';
import { TarefaService } from '../services/tarefa.service';
import { SubmeterExclusaoComponent } from "../../partials/submeter-exclusao/submeter-exclusao.component";
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { DetalhesTarefaComponent } from "../partials/detalhes/detalhes-tarefa.component";

@Component({
  selector: 'app-excluir-tarefa',
  standalone: true,
  imports: [ SubmeterExclusaoComponent, TituloComponent, DetalhesTarefaComponent ],
  templateUrl: './excluir-tarefa.component.html'
})

export class ExcluirTarefaComponent {
  tarefa?: DetalhesTarefaViewModel;
  nomeDotarefa: string;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
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
