import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { toTitleCase } from '../../../app.component';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { DetalhesCompromisso } from '../../compromissos/models/compromisso.models';
import { CompromissoService } from '../../compromissos/services/compromisso.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-excluir-compromisso',
  standalone: true,
  imports: [ NgIf, RouterLink, AsyncPipe, MatButtonModule, MatIconModule ],
  templateUrl: './excluir-compromisso.component.html',
  styleUrl: '../styles/compromissos.scss'
})

export class ExcluirCompromissoComponent {
  id?: string;
  compromisso$?: Observable<DetalhesCompromisso>;
  nomeDoCompromisso: string;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private compromissoService: CompromissoService,
    private notificacao: NotificacaoService
  ) {
    this.nomeDoCompromisso = "";
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (!this.id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');
    this.compromisso$ = this.compromissoService.selecionarPorId(this.id).pipe(
      tap(compromisso => this.nomeDoCompromisso = compromisso.assunto))
  }

  excluir() {
    if (!this.id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');

    this.compromissoService
      .excluir(this.id)
      .subscribe(() => {
        this.notificacao.sucesso(
          `O compromisso '${toTitleCase(this.nomeDoCompromisso)}' foi excluído com sucesso!`
        );

        this.router.navigate(['/compromissos']);
      });
  }
}
