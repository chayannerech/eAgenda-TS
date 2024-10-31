import { NgIf, AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink, ActivatedRoute, Router } from "@angular/router";
import { PartialObserver } from "rxjs";
import { NotificacaoService } from "../../../core/notificacao/notificacao.service";
import { SubmeterExclusaoComponent } from "../../partials/submeter-exclusao/submeter-exclusao.component";
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { DetalhesDespesaViewModel } from "../models/despesa.models";
import { DespesaService } from "../services/despesas.service";

@Component({
  selector: 'app-excluir-despesa',
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
    DetalhesDespesaComponent
],
  templateUrl: './excluir-despesa.component.html',
  styleUrl: '../styles/despesas.scss'
})

export class ExcluirDespesaComponent {
  despesa?: DetalhesDespesaViewModel;
  assuntoDoDespesa: string;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private despesaService: DespesaService,
    private notificacao: NotificacaoService
  ) {
    this.assuntoDoDespesa = "";
  }

  ngOnInit(): void {
    this.despesa = this.route.snapshot.data['despesa'];
    this.despesa!.horaInicio = this.despesaService.formatarHorario(this.despesa!.horaInicio);
    this.despesa!.horaTermino = this.despesaService.formatarHorario(this.despesa!.horaTermino);
    this.assuntoDoDespesa = this.despesa!.assunto;
  }

  excluir() {
    const id = this.route.snapshot.params['id'];
    if (!id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');

    const observer: PartialObserver<DespesaExcluidoViewModel> = {
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro)
    }

    this.despesaService.excluir(id).subscribe(observer);
  }

  private processarSucesso() {
    this.notificacao.sucesso(
      `O contato '${this.assuntoDoDespesa}' foi excluído com sucesso!`
    );
    this.router.navigate(['/despesas']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}
