import { NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { ItemTarefaViewModel } from '../../models/tarefa.models';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-input-itens',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
  ],
  templateUrl: './input-itens.component.html',
  styleUrl: '../../styles/tarefas.scss'
})

export class InputItensComponent {
  @Input() itensTarefa: ItemTarefaViewModel[] = [];
  @Input() erroSemItens: boolean = false;
  @Output() adicionarItem = new EventEmitter<string>();
  @Output() excluirItem = new EventEmitter<string>();
  @Output() editarItem = new EventEmitter<{ id: string, titulo: string }>();
  @Output() toggleConcluirItem = new EventEmitter<number>();

  cadastrandoItem = false;
  editandoItem: ItemTarefaViewModel | null = null;
  itemEmExclusao: ItemTarefaViewModel | null = null;
  iconeSanfona = 'expand_more';

  itemForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.itemForm = this.fb.group({ titulo: ['', [Validators.required, Validators.minLength(3)]] });
  }

  alterarIconeSanfona() {
    this.iconeSanfona = this.iconeSanfona == 'arrow_drop_down' ? 'arrow_drop_up' : 'arrow_drop_down';
  }

  iniciarCadastroItem() {
    this.cadastrandoItem = true;
    this.editandoItem = null;
    this.itemForm.reset();
  }

  cancelarAcao() {
    this.cadastrandoItem = false;
    this.editandoItem = null;
    this.itemForm.reset();
  }

  iniciarEdicaoItem(item: ItemTarefaViewModel) {
    this.editandoItem = item;
    this.cadastrandoItem = false;
    this.itemForm.patchValue({ titulo: item.titulo });
  }

  confirmarExclusao(item: ItemTarefaViewModel) {
    this.itemEmExclusao = item;
  }

  cancelarExclusao() {
    this.itemEmExclusao = null;
  }

  concluirExclusao() {
    if (this.itemEmExclusao) {
      this.excluirItem.emit(this.itemEmExclusao.id);
      this.itemEmExclusao = null;
    }
  }

  salvarItem() {
    const titulo = this.itemForm.value.titulo;
    if (this.editandoItem) {
      this.editarItem.emit({ id: this.editandoItem.id, titulo });
      this.editandoItem = null;
    } else {
      this.adicionarItem.emit(titulo);
    }
    this.itemForm.reset();
    this.cadastrandoItem = false;
  }
}
