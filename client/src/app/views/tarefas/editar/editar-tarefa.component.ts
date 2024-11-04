import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { NgStyle } from '@angular/common';
import { PartialObserver } from 'rxjs';
import { DetalhesTarefaViewModel, EditarTarefaViewModel, ItemTarefaViewModel, TarefaEditadaViewModel } from '../models/tarefa.models';
import { TarefaService } from '../services/tarefa.service';
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { SubmeterFormComponent } from "../../partials/submeter-form/submeter-form.component";
import { InputTextoComponent } from "../../partials/input-texto/input-texto.component";
import { InputRadioComponent } from "../../partials/input-radio/input-radio.component";
import { ConclusaoItensComponent } from "../partials/conclusao-itens/conclusao-itens.component";

@Component({
  selector: 'app-inserir-tarefa',
  standalone: true,
  imports: [
    NgStyle,
    ReactiveFormsModule,
    TituloComponent,
    InputTextoComponent,
    InputRadioComponent,
    ConclusaoItensComponent,
    SubmeterFormComponent
],

  templateUrl: './editar-tarefa.component.html',
  styleUrl: '../styles/tarefas.scss',
})

export class EditarTarefaComponent implements OnInit {
  tarefaForm: FormGroup;
  itensTarefa: ItemTarefaViewModel[];
  porcentagemConclusao: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tarefaService: TarefaService,
    private notificacao: NotificacaoService
  ) {
    this.porcentagemConclusao = 0;
    this.itensTarefa = [];
    this.tarefaForm = this.fb.group({ titulo: '', prioridade: 0 });
  }

  ngOnInit(): void {
    const tarefa = this.route.snapshot.data['tarefa'];
    this.itensTarefa = tarefa.itens;
    this.trazerValoresParaEdicao(tarefa);
  }

  get titulo() { return this.tarefaForm.get('titulo'); }
  get prioridade() { return this.tarefaForm.get('prioridade'); }
  get empresa() { return this.tarefaForm.get('empresa'); }

  concluirItem(id: string) {
    const item = this.itensTarefa.find(item => item.id === id);
    if (item) item.concluido = !item.concluido;

    this.calcularPorcentagem(this.route.snapshot.data['tarefa']);
  }

  editar() {
    if (this.tarefaForm.invalid) return;

    const id = this.route.snapshot.params['id'];
    if (!id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');

    const tarefa: EditarTarefaViewModel = this.tarefaForm.value;
    tarefa.itens = this.itensTarefa;

    const observer: PartialObserver<TarefaEditadaViewModel> = {
      next: (tarefa) => this.processarSucesso(tarefa),
      error: (erro) => this.processarFalha(erro)
    }

    this.tarefaService.editar(id, tarefa).subscribe(observer);
  }

  private processarSucesso(tarefaEditada: TarefaEditadaViewModel) {
    this.notificacao.sucesso(
      `A tarefa '${tarefaEditada.titulo}' foi editada com sucesso!`
    );
    this.router.navigate(['/tarefas']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }

  private trazerValoresParaEdicao(tarefaSelecionada: DetalhesTarefaViewModel) {
    this.itensTarefa = tarefaSelecionada.itens;
    this.tarefaForm.patchValue(tarefaSelecionada);
    this.calcularPorcentagem(tarefaSelecionada);

    if (tarefaSelecionada.prioridade == 'Normal')
      this.prioridade?.setValue(1);
    else if (tarefaSelecionada.prioridade == 'Baixinha')
      this.prioridade?.setValue(0);
    else
      this.prioridade?.setValue(2);
  }

  private calcularPorcentagem(tarefa: DetalhesTarefaViewModel) {
    const itensConcluidos = this.itensTarefa.filter(i => i.concluido);
    const porcentagem = Math.round(itensConcluidos.length * 100 / this.itensTarefa.length);
    this.porcentagemConclusao = porcentagem;

    porcentagem == 100 ? tarefa.dataConclusao = new Date().toString() : tarefa.dataConclusao = '';
  }
}
