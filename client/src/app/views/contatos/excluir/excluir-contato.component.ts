import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { lastValueFrom, PartialObserver } from 'rxjs';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { ContatoService } from '../services/contato.service';
import { ContatoExcluidoViewModel, DetalhesContatoViewModel } from '../models/contato.models';
import { SubmeterExclusaoComponent } from "../../partials/submeter-exclusao/submeter-exclusao.component";
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { DetalhesCompromissoComponent } from "../detalhes/detalhes-contato.component";
import { CompromissoService } from '../../compromissos/services/compromisso.service';
import { ListarCompromissosViewModel } from '../../compromissos/models/compromisso.models';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-excluir-contato',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    MatButtonModule,
    MatError,
    MatIconModule,
    SubmeterExclusaoComponent,
    TituloComponent,
    DetalhesCompromissoComponent],
  templateUrl: './excluir-contato.component.html'
})

export class ExcluirContatoComponent {
  contato?: DetalhesContatoViewModel;
  nomeDoContato: string;
  compromissos: ListarCompromissosViewModel[];


  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private contatoService: ContatoService,
    private compromissoService: CompromissoService,
    private notificacao: NotificacaoService
  ) {
    this.nomeDoContato = "";
    this.compromissos = [];
  }

  async ngOnInit(): Promise<void> {
    this.contato = this.route.snapshot.data['contato'];
    this.nomeDoContato = this.contato!.nome;

    let compromissosId: string[] = [];
    compromissosId = (await lastValueFrom(this.compromissoService.selecionarTodos())).map(c => c.id);

    for (let id of compromissosId) {
      const c = (await lastValueFrom(this.compromissoService.selecionarPorId(id)));

      if (c.contato.id == this.contato?.id) this.compromissos.push(c);
    }

    this.contato!.compromissos = this.compromissos;
  }

  excluir() {
    const id = this.route.snapshot.params['id'];
    if (!id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');

    const observer: PartialObserver<ContatoExcluidoViewModel> = {
      next: () => this.processarSucesso(),
      error: (erro) => {
        this.processarFalha(erro)
      }
    }

    this.contatoService.excluir(id).subscribe(observer);
  }

  private processarSucesso() {
    this.notificacao.sucesso(
      `O contato '${this.nomeDoContato}' foi excluído com sucesso!`
    );
    this.router.navigate(['/contatos']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}
