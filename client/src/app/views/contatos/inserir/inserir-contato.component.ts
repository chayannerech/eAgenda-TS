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
import { InserirContato } from '../models/contato.models';
import { ContatoService } from '../services/contato.service';
import { formatarComponente, toTitleCase } from '../../../app.component';

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

    const novoContato: InserirContato = this.contatoForm.value;
    formatarComponente(novoContato);
    novoContato.telefone = this.formatarTelefone(novoContato.telefone);

    this.contatoService.cadastrar(novoContato).subscribe((res) => {
      this.notificacao.sucesso(
        `O contato '${novoContato.nome}' foi cadastrado com sucesso!`
      );

      this.router.navigate(['/contatos']);
    });
  }

  private formatarTelefone(telefone: string): string {
    const ddd = telefone.slice(0, 2);
    const parte1 = telefone.slice(2, 7);
    const parte2 = telefone.slice(7, 11);
    return `(${ddd}) ${parte1}-${parte2}`;
  }
}
