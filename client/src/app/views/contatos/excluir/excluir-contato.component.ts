import { NgIf, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { toTitleCase } from '../../../app.component';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { ContatoService } from '../services/contato.service';
import { DetalhesContato } from '../models/contato.models';

@Component({
  selector: 'app-excluir-contato',
  standalone: true,
  imports: [ NgIf, RouterLink, AsyncPipe, MatButtonModule, MatIconModule ],
  templateUrl: './excluir-contato.component.html'
})

export class ExcluirContatoComponent {
  id?: string;
  contato$?: Observable<DetalhesContato>;
  nomeDoContato: string;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private contatoService: ContatoService,
    private notificacao: NotificacaoService
  ) {
    this.nomeDoContato = "";
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (!this.id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');
    this.contato$ = this.contatoService.selecionarPorId(this.id).pipe(
      tap(contato => this.nomeDoContato = contato.nome))
  }

  excluir() {
    if (!this.id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');

    this.contatoService
      .excluir(this.id)
      .subscribe(() => {
        this.notificacao.sucesso(
          `A contato '${toTitleCase(this.nomeDoContato)}' foi excluída com sucesso!`
        );

        this.router.navigate(['/contatos']);
      });
  }
}
