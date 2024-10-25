import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';
import { CategoriaEditadaViewModel, EditarCategoriaViewModel } from '../models/categoria.models';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { PartialObserver } from 'rxjs/internal/types';

@Component({
  selector: 'app-editar-categorias',
  standalone: true,
  imports: [ RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule ],
  templateUrl: './editar-categoria.component.html',
  styleUrl: '../styles/categorias.scss',
})

export class EditarCategoriaComponent implements OnInit{
  categoriaForm: FormGroup;

  constructor (
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    const categoria = this.route.snapshot.data['categoria'];
    this.categoriaForm.patchValue(categoria);
  }

  get titulo() { return this.categoriaForm.get('titulo');}

  editar() {
    if (this.categoriaForm.invalid) return;

    const id = this.route.snapshot.params['id'];
    if (!id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');

    const categoriaEditada: EditarCategoriaViewModel = this.categoriaForm.value;
    const observer: PartialObserver<CategoriaEditadaViewModel> = {
      next: (categoria) => this.processarSucesso(categoria),
      error: (erro) => this.processarFalha(erro)
    }

    this.categoriaService.editar(id, categoriaEditada).subscribe(observer);
  }

  private processarSucesso(categoriaEditada: CategoriaEditadaViewModel) {
    this.notificacao.sucesso(
      `A categoria ${categoriaEditada.titulo} foi editada com sucesso!`
    );

    this.router.navigate(['/categorias']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}
