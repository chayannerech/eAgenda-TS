import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, PartialObserver } from 'rxjs';
import { CategoriaExcluidaViewModel, DetalhesCategoriaViewModel } from '../models/categoria.models';
import { CategoriaService } from '../services/categoria.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { SubmeterExclusaoComponent } from '../../partials/submeter-exclusao/submeter-exclusao.component';
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { DetalhesCategoriaComponent } from '../partials/detalhes/detalhes-categoria.component';
import { DespesaService } from '../../despesas/services/despesas.service';
import { ListarDespesasViewModel } from '../../despesas/models/despesa.models';
@Component({
  selector: 'app-excluir-categorias',
  standalone: true,
  imports: [ TituloComponent, DetalhesCategoriaComponent, SubmeterExclusaoComponent ],
  templateUrl: './excluir-categorias.component.html',
})

export class ExcluirCategoriaComponent implements OnInit {
  id?: string;
  categoria?: DetalhesCategoriaViewModel;
  tituloDaCategoria: string;
  despesas: ListarDespesasViewModel[];

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private despesaService: DespesaService,
    private notificacao: NotificacaoService
  ) {
    this.tituloDaCategoria = "";
    this.despesas = [];
  }

  async ngOnInit(): Promise<void> {
    this.categoria = this.route.snapshot.data['categoria'];
    this.tituloDaCategoria = this.categoria!.titulo;

    let despesas: ListarDespesasViewModel[] = [];
    despesas = (await lastValueFrom(this.despesaService.selecionarTodos()));

    for (let desp of despesas) {
      const d = (await lastValueFrom(this.despesaService.selecionarPorId(desp.id)));

      if (d.categorias.includes(this.categoria!.titulo)) this.despesas.push(d);
    }

    this.categoria!.despesas = this.despesas;

    console.log(despesas);
  }

  excluir() {
      const id = this.route.snapshot.params['id'];
      if (!id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');

      const observer: PartialObserver<CategoriaExcluidaViewModel> = {
        next: () => this.processarSucesso(),
        error: (erro) => this.processarFalha(erro)
      }

      this.categoriaService.excluir(id).subscribe(observer);
  }

  private processarSucesso() {
    this.notificacao.sucesso(
      `A categoria '${this.tituloDaCategoria}' foi excluída com sucesso!`
    );

    this.router.navigate(['/categorias']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}
