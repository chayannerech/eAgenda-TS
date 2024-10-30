import { NgForOf, NgIf, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListarContatosViewModel } from '../models/contato.models';
import { BotaoCadastrarComponent } from "../../partials/botao-cadastrar/botao-cadastrar.component";
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { CardFooterComponent } from "../../partials/card-footer/card-footer.component";

@Component({
  selector: 'app-listar-contato',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    BotaoCadastrarComponent,
    TituloComponent,
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
