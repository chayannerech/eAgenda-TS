import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgForOf, NgIf, NgStyle } from '@angular/common';
import { DetalhesTarefaViewModel } from '../../models/tarefa.models';

@Component({
  selector: 'app-detalhes-tarefa',
  standalone: true,
  imports: [
    NgIf,
    NgStyle,
    NgForOf,
    MatCardModule
  ],
  templateUrl: './detalhes-tarefa.component.html',
  styleUrl: '../../styles/tarefas.scss'
})

export class DetalhesTarefaComponent {
  @Input() tarefa: DetalhesTarefaViewModel | undefined;

  mostrarData(data: string): string {
    const shortDate = new Date(data);
    return shortDate.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
