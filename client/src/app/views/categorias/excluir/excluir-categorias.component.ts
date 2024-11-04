import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { CategoriaExcluidaViewModel, DetalhesCategoriaViewModel } from '../models/categoria.models';
import { CategoriaService } from '../services/categoria.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { SubmeterExclusaoComponent } from '../../partials/submeter-exclusao/submeter-exclusao.component';
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { DetalhesCategoriaComponent } from '../partials/detalhes/detalhes-categoria.component';
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

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private notificacao: NotificacaoService
  ) {
    this.tituloDaCategoria = "";
  }

  ngOnInit(): void {
    this.categoria = this.route.snapshot.data['categoria'];
    this.tituloDaCategoria = this.categoria!.titulo;
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
