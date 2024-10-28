import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { PartialObserver } from 'rxjs';
import { InserirTarefaViewModel, TarefaInseridaViewModel } from '../models/tarefa.models';
import { TarefaService } from '../services/tarefa.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-inserir-tarefa',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective,
    MatRadioModule,
    MatExpansionModule
  ],

  templateUrl: './inserir-tarefa.component.html',
  styleUrl: '../styles/tarefas.scss',
  providers: [provideNgxMask()]
})

export class InserirTarefaComponent {
  tarefaForm: FormGroup;

  constructor(
    private router: Router,
    private tarefaService: TarefaService,
    private notificacao: NotificacaoService
  ) {
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
  }

  get titulo() { return this.tarefaForm.get('titulo'); }
  get prioridade() { return this.tarefaForm.get('prioridade'); }
  get empresa() { return this.tarefaForm.get('empresa'); }
  get itens() { return this.tarefaForm.get('itens'); }
  get telefone() { return this.tarefaForm.get('telefone'); }

  cadastrar() {
    if (this.tarefaForm.invalid) return;

    const novoTarefa: InserirTarefaViewModel = this.tarefaForm.value;
    const observer: PartialObserver<TarefaInseridaViewModel> = {
      next: (novoTarefa) => this.processarSucesso(novoTarefa),
      error: (erro) => this.processarFalha(erro)
    }

    this.tarefaService.cadastrar(novoTarefa).subscribe(observer);
  }

  private processarSucesso(novoTarefa: TarefaInseridaViewModel) {
    this.notificacao.sucesso(
      `O tarefa '${novoTarefa.titulo}' foi cadastrado com sucesso!`
    );
    this.router.navigate(['/tarefas']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}
