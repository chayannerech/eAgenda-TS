import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PartialObserver } from 'rxjs';
import { DetalhesTarefaViewModel, EditarTarefaViewModel, InserirTarefaViewModel, ItemTarefaViewModel, TarefaEditadaViewModel, TarefaInseridaViewModel } from '../models/tarefa.models';
import { TarefaService } from '../services/tarefa.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-inserir-tarefa',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    NgStyle,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatExpansionModule,
],

  templateUrl: './editar-tarefa.component.html',
  styleUrl: '../styles/tarefas.scss',
})

export class EditarTarefaComponent implements OnInit {
  tarefaForm: FormGroup;
  itemForm: FormGroup;
  itensTarefa: ItemTarefaViewModel[];
  iconeSanfona: string;
  porcentagemConclusao: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tarefaService: TarefaService,
    private notificacao: NotificacaoService
  ) {
    this.iconeSanfona = 'arrow_drop_down';
    this.porcentagemConclusao = 0;
    this.itensTarefa = [];
    this.tarefaForm = new FormGroup({
      titulo: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      prioridade: new FormControl<string>('0'),
    });
    this.itemForm = new FormGroup({
      titulo: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  ngOnInit(): void {
    const tarefa = this.route.snapshot.data['tarefa'];
    this.itensTarefa = tarefa.itens;
    this.trazerValoresParaEdicao(tarefa);
  }

  get titulo() { return this.tarefaForm.get('titulo'); }
  get prioridade() { return this.tarefaForm.get('prioridade'); }
  get empresa() { return this.tarefaForm.get('empresa'); }
  get tituloTarefa() { return this.itemForm.get('titulo'); }

  alterarIconeSanfona(): void {
    this.iconeSanfona = this.iconeSanfona == 'arrow_drop_down' ? 'arrow_drop_up' : 'arrow_drop_down';
  }

  concluirItem(id: string) {
    const itemConcluido = this.selecionarItemPorId(id);
    itemConcluido!.concluido = !itemConcluido!.concluido;

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

  private selecionarItemPorId(id: string) : ItemTarefaViewModel | undefined{
    for(let item of this.itensTarefa)
      if (item.id == id)
        return item;
    return;
  }

  private trazerValoresParaEdicao(tarefaSelecionada: DetalhesTarefaViewModel) {
    this.itensTarefa = tarefaSelecionada.itens;
    this.tarefaForm.patchValue(tarefaSelecionada);
    this.calcularPorcentagem(tarefaSelecionada);

    if (tarefaSelecionada.prioridade == 'Normal')
      this.prioridade?.setValue('1');
    else if (tarefaSelecionada.prioridade == 'Baixinha')
      this.prioridade?.setValue('0');
    else
      this.prioridade?.setValue('2');
  }

  private calcularPorcentagem(tarefa: DetalhesTarefaViewModel) {
    const itensConcluidos = this.itensTarefa.filter(i => i.concluido);
    const porcentagem = itensConcluidos.length * 100 / this.itensTarefa.length;
    this.porcentagemConclusao = porcentagem;

    porcentagem == 100 ? tarefa.dataConclusao = new Date().toString() : tarefa.dataConclusao = '';
    console.log(tarefa);
  }
}
