import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ListarCategoriasViewModel } from '../models/categoria.models';
import { NgForOf, NgIf } from '@angular/common';
import { CardFooterComponent } from "../../partials/card-footer/card-footer.component";

@Component({
  selector: 'app-card-categorias',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatCardModule,
    CardFooterComponent
],
  templateUrl: './card-categorias.component.html',
  styleUrl: '../styles/categorias.scss'
})

export class CardCategoriasComponent {
  @Input() categorias?: ListarCategoriasViewModel[] = [];
}
