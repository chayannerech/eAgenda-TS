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
import { ContatoInseridoViewModel, InserirContatoViewModel } from '../models/contato.models';
import { ContatoService } from '../services/contato.service';
import { PartialObserver } from 'rxjs';
import { toTitleCase } from '../../../app.component';

@Component({
  selector: 'app-inserir-contato',
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
  templateUrl: './inserir-contato.component.html',
  styleUrl: '../styles/contatos.scss',
  providers: [provideNgxMask()]
})

export class InserirContatoComponent {
  contatoForm: FormGroup;

  constructor(
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

  get nome() { return this.contatoForm.get('nome'); }
  get email() { return this.contatoForm.get('email'); }
  get empresa() { return this.contatoForm.get('empresa'); }
  get cargo() { return this.contatoForm.get('cargo'); }
  get telefone() { return this.contatoForm.get('telefone'); }

  cadastrar() {
    if (this.contatoForm.invalid) return;

    const novoContato: InserirContatoViewModel = this.contatoForm.value;
    const observer: PartialObserver<ContatoInseridoViewModel> = {
      next: (novoContato) => this.processarSucesso(novoContato),
      error: (erro) => this.processarFalha(erro)
    }

    this.contatoService.cadastrar(novoContato).subscribe(observer);
  }

  private processarSucesso(novoContato: ContatoInseridoViewModel) {
    this.notificacao.sucesso(
      `O contato '${novoContato.nome}' foi cadastrado com sucesso!`
    );
    this.router.navigate(['/contatos']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}
