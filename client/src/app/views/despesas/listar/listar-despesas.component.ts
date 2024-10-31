import { NgForOf, NgIf, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListarDespesasViewModel } from '../models/despesa.models';
import { BotaoCadastrarComponent } from "../../partials/botao-cadastrar/botao-cadastrar.component";
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { CardFooterComponent } from "../../partials/card-footer/card-footer.component";

@Component({
  selector: 'app-listar-despesas',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    BotaoCadastrarComponent,
    TituloComponent,
    CardFooterComponent
  ],
  templateUrl: './listar-despesas.component.html',
  styleUrl: '../styles/despesas.scss'
})

export class ListarDespesasComponent {
  despesas?: ListarDespesasViewModel[];

  constructor( private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.despesas = this.route.snapshot.data['despesas'];
  }
}
