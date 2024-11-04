import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListarTarefasViewModel } from '../models/tarefa.models';
import { BotaoCadastrarComponent } from "../../partials/botao-cadastrar/botao-cadastrar.component";
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { CardFooterComponent } from "../../partials/card-footer/card-footer.component";
import { CardTarefasComponent } from "../partials/card-tarefas/card-tarefas.component";

@Component({
  selector: 'app-listar-tarefas',
  standalone: true,
  imports: [
    TituloComponent,
    BotaoCadastrarComponent,
    CardTarefasComponent,
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
