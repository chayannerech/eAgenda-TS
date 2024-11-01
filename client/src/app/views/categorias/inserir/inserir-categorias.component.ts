import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { CategoriaInseridaViewModel, InserirCategoriaViewModel } from '../models/categoria.models';
import { CategoriaService } from '../services/categoria.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { NgIf } from '@angular/common';
import { PartialObserver } from 'rxjs';
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { SubmeterFormComponent } from "../../partials/submeter-form/submeter-form.component";
import { InputTextoComponent } from "../../partials/input-texto/input-texto.component";

@Component({
  selector: 'app-inserir-categorias',
  standalone: true,
  imports: [NgIf, RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, TituloComponent, SubmeterFormComponent, InputTextoComponent],
  templateUrl: './inserir-categorias.component.html',
  styleUrl: '../styles/categorias.scss'
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

  obterTitulo(titulo: string) {
    this.titulo?.setValue(titulo);
  }

  cadastrar() {
    if (this.categoriaForm.invalid) return;

    const novaCategoria: InserirCategoriaViewModel = this.categoriaForm.value;
    const observer: PartialObserver<CategoriaInseridaViewModel> = {
      next: (novaCategoria) => this.processarSucesso(novaCategoria),
      error: (erro) => this.processarFalha(erro)
    }

    this.categoriaService.cadastrar(novaCategoria).subscribe(observer);
  }

  private processarSucesso(novaCategoria: CategoriaInseridaViewModel) {
    this.notificacao.sucesso(
      `A categoria '${novaCategoria.titulo}' foi cadastrada com sucesso!`
    );

    this.router.navigate(['/categorias']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}
