import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { InserirCategoria } from '../models/categoria.models';
import { CategoriaService } from '../services/categoria.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-inserir-categorias',
  standalone: true,
  imports: [ NgIf, RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule ],
  templateUrl: './inserir-categorias.component.html'
})

export class InserirCategoriaComponent {
  categoriaForm: FormGroup;

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private notificacao: NotificacaoService
  ) {
    this.categoriaForm = new FormGroup({
      titulo: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  get titulo() {
    return this.categoriaForm.get('titulo');
  }

  cadastrar() {
    if (this.categoriaForm.invalid) return;

    const novaCategoria: InserirCategoria = this.categoriaForm.value;

    this.categoriaService.cadastrar(novaCategoria).subscribe((res) => {
      this.notificacao.sucesso(
        `A categoria '${novaCategoria.titulo}' foi cadastrada com sucesso!`
      );

      this.router.navigate(['/categorias']);
    });
  }
}
