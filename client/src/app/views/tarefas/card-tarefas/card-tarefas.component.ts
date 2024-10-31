import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ListarTarefasViewModel } from '../models/tarefa.models';
import { NgForOf, NgIf } from '@angular/common';
import { CardFooterComponent } from "../../partials/card-footer/card-footer.component";

@Component({
  selector: 'app-card-tarefas',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatCardModule,
    CardFooterComponent
],
  templateUrl: './card-tarefas.component.html',
  styleUrl: '../styles/tarefas.scss'
})

export class CardTarefasComponent {
  @Input() tarefas?: ListarTarefasViewModel[] = [];

  mostrarData(data: string): string {
    const shortDate = new Date(data)
    return shortDate.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
