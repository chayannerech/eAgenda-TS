import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DetalhesCompromissoViewModel } from '../models/compromisso.models';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-detalhes-compromisso',
  standalone: true,
  imports: [
    NgIf,
    MatCardModule
  ],
  templateUrl: './detalhes-compromisso.component.html',
  styleUrl: '../styles/compromissos.scss'
})

export class DetalhesCompromissoComponent {
  @Input() compromisso: DetalhesCompromissoViewModel | undefined;

  mostrarData(data: string): string {
    const shortDate = new Date(data)
    return shortDate.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
