import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf, NgStyle } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { provideNgxMask } from 'ngx-mask';
import { ListarCategoriasViewModel } from '../../../categorias/models/categoria.models';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-input-categorias',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './input-categorias.component.html',
  styleUrl: '../../styles/despesas.scss',
  providers: [provideNgxMask()]
})

export class InputCategoriasComponent {
  @Input() categorias: ListarCategoriasViewModel[] = [];
  @Input() categoriasSelecionadas: ListarCategoriasViewModel[] = [];
  @Input() semCategorias: boolean = false; // Controle de erro visual
  @Output() categoriaAdicionada = new EventEmitter<ListarCategoriasViewModel>();
  @Output() categoriaRemovida = new EventEmitter<ListarCategoriasViewModel>();

  selecionarCategoria(categoria: ListarCategoriasViewModel) {
    this.categoriaAdicionada.emit(categoria);
  }

  removerCategoria(categoria: ListarCategoriasViewModel) {
    this.categoriaRemovida.emit(categoria);
  }
}
