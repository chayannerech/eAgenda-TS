import { NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { ItemTarefaViewModel } from '../../models/tarefa.models';

@Component({
  selector: 'app-conclusao-itens',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatExpansionModule,
  ],
  templateUrl: './conclusao-itens.component.html',
  styleUrl: '../../styles/tarefas.scss'
})

export class ConclusaoItensComponent {
  @Input() itensTarefa: ItemTarefaViewModel[] = [];
  @Output() concluirItem = new EventEmitter<string>();

  iconeSanfona: string = 'arrow_drop_down';

  alterarIconeSanfona() {
    this.iconeSanfona = this.iconeSanfona == 'arrow_drop_down' ? 'arrow_drop_up' : 'arrow_drop_down';
  }

  concluirItemClick(itemId: string) {
    this.concluirItem.emit(itemId);
  }
}
