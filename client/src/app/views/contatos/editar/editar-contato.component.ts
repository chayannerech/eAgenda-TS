import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { ContatoEditadoViewModel, DetalhesContatoViewModel, EditarContatoViewModel, InserirContatoViewModel } from '../models/contato.models';
import { ContatoService } from '../services/contato.service';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { toTitleCase } from '../../../app.component';
import { PartialObserver } from 'rxjs';

@Component({
  selector: 'app-editar-contato',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective
  ],
  templateUrl: './editar-contato.component.html',
  styleUrl: '../styles/contatos.scss',
  providers: [provideNgxMask()]
})

export class EditarContatoComponent implements OnInit {
  id?: string;
  contatoForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contatoService: ContatoService,
    private notificacao: NotificacaoService
  ) {
    this.contatoForm = new FormGroup({
      nome: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      empresa: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      cargo: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      telefone: new FormControl<string>('', [
        Validators.required,
        Validators.pattern('^\\d{11}$'),
      ]),
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (!this.id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');
    this.contatoService.selecionarPorId(this.id).subscribe((res) => this.trazerValoresParaEdicao(res));
  }

  get nome() { return this.contatoForm.get('nome'); }
  get email() { return this.contatoForm.get('email'); }
  get empresa() { return this.contatoForm.get('empresa'); }
  get cargo() { return this.contatoForm.get('cargo'); }
  get telefone() { return this.contatoForm.get('telefone'); }

  editar() {
    if (this.contatoForm.invalid) return;
    if (!this.id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');

    const contato: EditarContatoViewModel = this.contatoForm.value;
    const observer: PartialObserver<ContatoEditadoViewModel> = {
      next: (contato) => this.processarSucesso(contato),
      error: (erro) => this.processarFalha(erro)
    }

    this.contatoService.editar(this.id, contato).subscribe(observer);
  }

  private trazerValoresParaEdicao(contatoSelecionado: DetalhesContatoViewModel) {
    contatoSelecionado.telefone = this.contatoService.removerFormatacaoTelefone(contatoSelecionado.telefone);
    this.contatoForm.patchValue(contatoSelecionado);
  }

  private processarSucesso(novoContato: ContatoEditadoViewModel) {
    this.notificacao.sucesso(
      `O contato '${novoContato.nome}' foi editado com sucesso!`
    );
    this.router.navigate(['/contatos']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}
