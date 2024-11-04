import { Component, OnInit } from '@angular/core';
import { ListarCategoriasViewModel } from '../models/categoria.models';
import { ActivatedRoute } from '@angular/router';
import { BotaoCadastrarComponent } from "../../partials/botao-cadastrar/botao-cadastrar.component";
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { CardFooterComponent } from "../../partials/card-footer/card-footer.component";
import { CardCategoriasComponent } from '../partials/card-categorias/card-categorias.component';

@Component({
  selector: 'app-listagem-categorias',
  standalone: true,
  imports: [
    TituloComponent,
    BotaoCadastrarComponent,
    CardCategoriasComponent,
    CardFooterComponent
],
  templateUrl: './listar-categorias.component.html',
  styleUrl: '../styles/categorias.scss'
})

export class ListarCategoriasComponent implements OnInit {
  categorias?: ListarCategoriasViewModel[];

  constructor( private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.categorias = this.route.snapshot.data['categorias'];
  }
}
