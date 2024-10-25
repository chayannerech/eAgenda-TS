import { Component, OnInit } from '@angular/core';
import { ListarCategoriasViewModel } from '../models/categoria.models';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoriaService } from '../services/categoria.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listagem-categorias',
  standalone: true,
  imports: [ RouterLink, NgForOf, NgIf, AsyncPipe, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule ],
  templateUrl: './listar-categorias.component.html',
  styleUrl: '../styles/categorias.scss'
})

export class ListarCategoriasComponent implements OnInit {
  categorias?: ListarCategoriasViewModel[];

  constructor( private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.categorias = this.route.snapshot.data['categorias'];
  }
}
