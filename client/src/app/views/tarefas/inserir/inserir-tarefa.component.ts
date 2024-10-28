import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { PartialObserver } from 'rxjs';
import { InserirTarefaViewModel, ItemTarefaViewModel, TarefaInseridaViewModel } from '../models/tarefa.models';
import { TarefaService } from '../services/tarefa.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-inserir-tarefa',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective,
    MatRadioModule,
    MatExpansionModule,
    MatCheckboxModule,
    FormsModule
  ],

  templateUrl: './inserir-tarefa.component.html',
  styleUrl: '../styles/tarefas.scss',
  providers: [provideNgxMask()]
})

export class InserirTarefaComponent {
  tarefaForm: FormGroup;
  itemForm: FormGroup;
  cadastrandoItem: boolean;
  itensTarefa: ItemTarefaViewModel[];
  idItem: number;

  constructor(
    private router: Router,
    private tarefaService: TarefaService,
    private notificacao: NotificacaoService
  ) {
    this.cadastrandoItem = false;
    this.itensTarefa = [];
    this.idItem = 0;
    this.tarefaForm = new FormGroup({
      titulo: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      prioridade: new FormControl<string>('0'),
      empresa: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      itens: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      telefone: new FormControl<string>('', [
        Validators.required,
        Validators.pattern('^\\d{11}$'),
      ]),
    });
    this.itemForm = new FormGroup({
      tituloTarefa: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  get titulo() { return this.tarefaForm.get('titulo'); }
  get prioridade() { return this.tarefaForm.get('prioridade'); }
  get empresa() { return this.tarefaForm.get('empresa'); }
  get itens() { return this.tarefaForm.get('itens'); }
  get tituloTarefa() { return this.itemForm.get('tituloTarefa'); }

  inserirItens() {
    if (this.itemForm.invalid) return;

    this.idItem++;
    const novoItem: ItemTarefaViewModel = this.itemForm.value;
    novoItem.id = this.idItem;
    novoItem.status = 0;

    this.itensTarefa.push(novoItem);
    this.cadastrandoItem = false;
    this.tituloTarefa?.reset();
  }

  cancelarItem() {
    this.cadastrandoItem = false;
    this.tituloTarefa?.reset();
  }

  cadastrar() {
    if (this.tarefaForm.invalid) return;

    const novaTarefa: InserirTarefaViewModel = this.tarefaForm.value;
    const observer: PartialObserver<TarefaInseridaViewModel> = {
      next: (novaTarefa) => this.processarSucesso(novaTarefa),
      error: (erro) => this.processarFalha(erro)
    }

    this.tarefaService.cadastrar(novaTarefa).subscribe(observer);
  }

  private processarSucesso(novaTarefa: TarefaInseridaViewModel) {
    this.notificacao.sucesso(
      `O tarefa '${novaTarefa.titulo}' foi cadastrado com sucesso!`
    );
    this.router.navigate(['/tarefas']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}
