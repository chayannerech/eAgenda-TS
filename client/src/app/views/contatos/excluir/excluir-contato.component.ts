import { NgIf, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { ContatoService } from '../services/contato.service';
import { ContatoExcluidoViewModel, DetalhesContatoViewModel } from '../models/contato.models';
import { SubmeterExclusaoComponent } from "../../partials/submeter-exclusao/submeter-exclusao.component";
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { DetalhesCompromissoComponent } from "../detalhes/detalhes-contato.component";
import { ListarCompromissosViewModel } from '../../compromissos/models/compromisso.models';

@Component({
  selector: 'app-excluir-contato',
  standalone: true,
  imports: [NgIf, RouterLink, AsyncPipe, MatButtonModule, MatIconModule, SubmeterExclusaoComponent, TituloComponent, DetalhesCompromissoComponent],
  templateUrl: './excluir-contato.component.html'
})

export class ExcluirContatoComponent {
  contato?: DetalhesContatoViewModel;
  compromissos?: ListarCompromissosViewModel[];
  nomeDoContato: string;
  compromissosId: string[];

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private contatoService: ContatoService,
    private notificacao: NotificacaoService
  ) {
    this.nomeDoContato = "";
    this.compromissosId = [];
  }

  ngOnInit(): void {
    this.contato = this.route.snapshot.data['contato'];
    this.nomeDoContato = this.contato!.nome;
    }



  excluir() {
    const id = this.route.snapshot.params['id'];
    if (!id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');

    const observer: PartialObserver<ContatoExcluidoViewModel> = {
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro)
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
