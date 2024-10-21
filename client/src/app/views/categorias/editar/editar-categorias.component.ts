import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';
import { CategoriaEditada, DetalhesCategoria, EditarCategoria } from '../models/categoria.models';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';

@Component({
  selector: 'app-editar-categorias',
  standalone: true,
  imports: [ RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule ],
  templateUrl: './editar-categorias.component.html',
})
export class EditarCategoriaComponent implements OnInit{
  id?: number;
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
    this.id = this.route.snapshot.params['id'];

    if (!this.id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');
    this.categoriaService.selecionarPorId(this.id).subscribe((res) => this.trazerValoresParaEdicao(res));
  }

  get titulo() {
    return this.categoriaForm.get('titulo');
  }

  editar() {
    if (this.categoriaForm.invalid) return;
    if (!this.id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');

    const categoriaEditada: EditarCategoria = this.categoriaForm.value;

    this.categoriaService.editar(this.id, categoriaEditada).subscribe((res) => {
      this.notificacao.sucesso(
        `A categoria ${res.titulo} foi editada com sucesso!`
      );

      this.router.navigate(['/categorias']);
    });
  }

  private trazerValoresParaEdicao(categoriaSelecionada: DetalhesCategoria) {
    this.categoriaForm.patchValue(categoriaSelecionada);
  }
}
