import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { PartialObserver } from 'rxjs';
import { InserirTarefaViewModel, ItemTarefaViewModel, TarefaInseridaViewModel } from '../models/tarefa.models';
import { TarefaService } from '../services/tarefa.service';
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { SubmeterFormComponent } from "../../partials/submeter-form/submeter-form.component";
import { InputTextoComponent } from "../../partials/input-texto/input-texto.component";
import { InputRadioComponent } from "../../partials/input-radio/input-radio.component";
import { InputItensComponent } from "../partials/input-itens/input-itens.component";
import { MatError } from '@angular/material/form-field';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-inserir-tarefa',
  standalone: true,
  imports: [
    NgIf,
    MatError,
    ReactiveFormsModule,
    TituloComponent,
    InputTextoComponent,
    InputRadioComponent,
    InputItensComponent,
    SubmeterFormComponent
],
  templateUrl: './inserir-tarefa.component.html',
  styleUrl: '../styles/tarefas.scss',
})

export class InserirTarefaComponent {
  tarefaForm: FormGroup;
  itensTarefa: ItemTarefaViewModel[];
  erroSemItens: boolean;

  cadastrandoItem: boolean;
  mostrandoItens: boolean;
  editandoItem: boolean;
  excluindoItem: boolean;
  itemEmEdicao: ItemTarefaViewModel | undefined;
  itemEmExclusao: ItemTarefaViewModel | undefined;
  iconeSanfona: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tarefaService: TarefaService,
    private notificacao: NotificacaoService
  ) {
    this.erroSemItens = this.cadastrandoItem = this.editandoItem = this.excluindoItem = this.mostrandoItens = false;
    this.itensTarefa = [];
    this.iconeSanfona = 'arrow_drop_down';
    this.tarefaForm = this.fb.group({ titulo: '', prioridade: 0 });
  }

  get titulo() { return this.tarefaForm.get('titulo'); }
  get prioridade() { return this.tarefaForm.get('prioridade'); }
  get empresa() { return this.tarefaForm.get('empresa'); }

  inserirItens(titulo: string) {
    const novoItem: ItemTarefaViewModel = {
      id: this.gerarUUID(),
      titulo,
      status: 0,
      concluido: false
    }

    this.itensTarefa.push(novoItem);
    this.cadastrandoItem = this.erroSemItens = false;
  }

  editarItem({ id, titulo }: { id: string, titulo: string }) {
    const item = this.itensTarefa.find(item => item.id === id);
    if (item) item.titulo = titulo;
  }

  excluirItem(id: string) {
    this.itensTarefa = this.itensTarefa.filter(item => item.id != id);
  }

  cadastrar() {
    if (this.validarFormulario()) return;

    const novaTarefa: InserirTarefaViewModel = this.tarefaForm.value;
    novaTarefa.itens = this.itensTarefa;

    const observer: PartialObserver<TarefaInseridaViewModel> = {
      next: (novaTarefa) => this.processarSucesso(novaTarefa),
      error: (erro) => this.processarFalha(erro)
    }

    this.tarefaService.cadastrar(novaTarefa).subscribe(observer);
  }

  private processarSucesso(novaTarefa: TarefaInseridaViewModel) {
    this.notificacao.sucesso(
      `A tarefa '${novaTarefa.titulo}' foi cadastrada com sucesso!`
    );
    this.router.navigate(['/tarefas']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }

  private gerarUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (caractere) => {
      const random = (Math.random() * 16) | 0;
      const valor = caractere === 'x' ? random : (random & 0x3) | 0x8;
      return valor.toString(16);
    });
  }

  private validarFormulario(): boolean {
    if (this.itensTarefa.length == 0)
      this.erroSemItens = true;
    if (this.tarefaForm.invalid)
      return true;
    return false;
  }
}
