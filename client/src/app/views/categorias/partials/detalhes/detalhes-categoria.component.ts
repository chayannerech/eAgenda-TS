import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgForOf, NgIf } from '@angular/common';
import { DetalhesCategoriaViewModel } from '../../models/categoria.models';

@Component({
  selector: 'app-detalhes-categoria',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatCardModule
  ],
  templateUrl: './detalhes-categoria.component.html',
  styleUrl: '../../styles/categorias.scss'
})

export class DetalhesCategoriaComponent {
  @Input() categoria: DetalhesCategoriaViewModel | undefined;


  mostrarData(data: string): string {
    const shortDate = new Date(data)
    return shortDate.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
