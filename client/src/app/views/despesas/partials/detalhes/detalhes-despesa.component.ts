import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DetalhesDespesaViewModel } from '../../models/despesa.models';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-detalhes-despesa',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatCardModule
  ],
  templateUrl: './detalhes-despesa.component.html',
  styleUrl: '../../styles/despesas.scss'
})

export class DetalhesDespesaComponent {
  @Input() despesa: DetalhesDespesaViewModel | undefined;

  mostrarData(data: string): string {
    const shortDate = new Date(data)
    return shortDate.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
