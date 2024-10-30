import { NgForOf, NgIf, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListarTarefasViewModel } from '../models/tarefa.models';
import { BotaoCadastrarComponent } from "../../partials/botao-cadastrar/botao-cadastrar.component";
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { CardFooterComponent } from "../../partials/card-footer/card-footer.component";

@Component({
  selector: 'app-listar-tarefas',
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
  templateUrl: './listar-tarefas.component.html',
  styleUrl: '../styles/tarefas.scss'
})

export class ListarTarefasComponent {
  tarefas?: ListarTarefasViewModel[] = [];

  constructor( private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.tarefas = this.route.snapshot.data['tarefas'];
  }

  mostrarData(data: string): string {
    const shortDate = new Date(data)
    return shortDate.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
