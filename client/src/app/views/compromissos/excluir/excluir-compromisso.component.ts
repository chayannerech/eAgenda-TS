import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { CompromissoExcluidoViewModel, DetalhesCompromissoViewModel } from '../../compromissos/models/compromisso.models';
import { CompromissoService } from '../../compromissos/services/compromisso.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SubmeterExclusaoComponent } from "../../partials/submeter-exclusao/submeter-exclusao.component";
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { MatCardModule } from '@angular/material/card';
import { DetalhesCompromissoComponent } from "../partials/detalhes/detalhes-compromisso.component";

@Component({
  selector: 'app-excluir-compromisso',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    SubmeterExclusaoComponent,
    TituloComponent,
    DetalhesCompromissoComponent
],
  templateUrl: './excluir-compromisso.component.html',
  styleUrl: '../styles/compromissos.scss'
})

export class ExcluirCompromissoComponent {
  compromisso?: DetalhesCompromissoViewModel;
  assuntoDoCompromisso: string;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private compromissoService: CompromissoService,
    private notificacao: NotificacaoService
  ) {
    this.assuntoDoCompromisso = "";
  }

  ngOnInit(): void {
    this.compromisso = this.route.snapshot.data['compromisso'];
    this.compromisso!.horaInicio = this.compromissoService.formatarHorario(this.compromisso!.horaInicio);
    this.compromisso!.horaTermino = this.compromissoService.formatarHorario(this.compromisso!.horaTermino);
    this.assuntoDoCompromisso = this.compromisso!.assunto;
  }

  excluir() {
    const id = this.route.snapshot.params['id'];
    if (!id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');

    const observer: PartialObserver<CompromissoExcluidoViewModel> = {
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro)
    }

    this.compromissoService.excluir(id).subscribe(observer);
  }

  private processarSucesso() {
    this.notificacao.sucesso(
      `O contato '${this.assuntoDoCompromisso}' foi excluído com sucesso!`
    );
    this.router.navigate(['/compromissos']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}
