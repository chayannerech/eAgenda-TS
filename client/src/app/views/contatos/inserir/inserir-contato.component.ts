import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { InserirCategoria } from '../../categorias/models/categoria.models';
import { CategoriaService } from '../../categorias/services/categoria.service';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { InserirContato } from '../models/contato.models';
import { ContatoService } from '../services/contato.service';
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
  styleUrl: './inserir-contato.component.scss',
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
    this.formatarContato(novoContato);

    this.contatoService.cadastrar(novoContato).subscribe((res) => {
      this.notificacao.sucesso(
        `O contato '${toTitleCase(novoContato.nome)}' foi cadastrado com sucesso!`
      );

      this.router.navigate(['/contatos']);
    });
  }

  private formatarContato(novoContato: InserirContato) {
    novoContato.nome = toTitleCase(novoContato.nome);
    novoContato.empresa = toTitleCase(novoContato.empresa);
    novoContato.cargo = toTitleCase(novoContato.cargo);
    novoContato.telefone = this.formatarTelefone(novoContato.telefone);
  }

  private formatarTelefone(telefone: string): string {
    const ddd = telefone.slice(0, 2);
    const parte1 = telefone.slice(2, 7);
    const parte2 = telefone.slice(7, 11);
    return `(${ddd}) ${parte1}-${parte2}`;
  }
}
