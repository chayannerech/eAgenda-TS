import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListarContatosViewModel } from '../models/contato.models';
import { BotaoCadastrarComponent } from "../../partials/botao-cadastrar/botao-cadastrar.component";
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { CardFooterComponent } from "../../partials/card-footer/card-footer.component";
import { CardContatosComponent } from "../partials/card-contatos/card-contatos.component";

@Component({
  selector: 'app-listar-contato',
  standalone: true,
  imports: [
    TituloComponent,
    BotaoCadastrarComponent,
    CardContatosComponent,
    CardFooterComponent
],
  templateUrl: './listar-contato.component.html',
  styleUrl: '../styles/contatos.scss'
})

export class ListarContatosComponent {
  contatos?: ListarContatosViewModel[] = [];

  constructor( private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.contatos = this.route.snapshot.data['contatos'];
  }
}
