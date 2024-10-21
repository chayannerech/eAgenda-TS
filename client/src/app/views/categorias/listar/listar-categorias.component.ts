import { Component, OnInit } from '@angular/core';
import { ListarCategorias } from '../models/categoria.models';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoriaService } from '../services/categoria.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-listagem-categorias',
  standalone: true,
  imports: [ RouterLink, NgForOf, NgIf, AsyncPipe, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule ],
  templateUrl: './listar-categorias.component.html',
  styleUrl: './listar-categorias.component.scss'
})

export class ListarCategoriasComponent implements OnInit {
  categorias$?: Observable<ListarCategorias[]>;

  constructor( private categoriaService: CategoriaService ) {}

  ngOnInit(): void {
    this.categorias$ = this.categoriaService.selecionarTodos().pipe(
      tap(categorias => console.log(categorias))  // Verifique o conteúdo do array
    );
  }
}
