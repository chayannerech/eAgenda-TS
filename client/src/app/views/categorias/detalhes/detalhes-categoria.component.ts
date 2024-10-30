import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { DetalhesCategoriaViewModel } from '../models/categoria.models';

@Component({
  selector: 'app-detalhes-categoria',
  standalone: true,
  imports: [
    NgIf,
    MatCardModule
  ],
  templateUrl: './detalhes-categoria.component.html',
  styleUrl: '../styles/categorias.scss'
})

export class DetalhesCategoriaComponent {
  @Input() categoria: DetalhesCategoriaViewModel | undefined;
}
