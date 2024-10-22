import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { DetalhesContato, EditarContato, InserirContato } from '../models/contato.models';
import { ContatoService } from '../services/contato.service';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { toTitleCase } from '../../../app.component';

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
  providers: [provideNgxMask()]
})

export class EditarContatoComponent implements OnInit {
  id?: number;
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

    const contatoEditado: EditarContato = this.contatoForm.value;
    this.formatarContato(contatoEditado);

    this.contatoService.editar(this.id, contatoEditado).subscribe((res) => {
      this.notificacao.sucesso(
        `O contato '${contatoEditado.nome}' foi editado com sucesso!`
      );

      this.router.navigate(['/contatos']);
    });
  }

  private formatarContato(contatoEditado: InserirContato) {
    contatoEditado.nome = toTitleCase(contatoEditado.nome);
    contatoEditado.empresa = toTitleCase(contatoEditado.empresa);
    contatoEditado.cargo = toTitleCase(contatoEditado.cargo);
    contatoEditado.telefone = this.formatarTelefone(contatoEditado.telefone);
  }

  private formatarTelefone(telefone: string): string {
    const ddd = telefone.slice(0, 2);
    const parte1 = telefone.slice(2, 7);
    const parte2 = telefone.slice(7, 11);
    return `(${ddd}) ${parte1}-${parte2}`;
  }

  private removerFormatacaoTelefone(telefone: string): string {
    return telefone.replace(/\D/g, '');
  }

  private trazerValoresParaEdicao(contatoSelecionado: DetalhesContato) {
    contatoSelecionado.telefone = this.removerFormatacaoTelefone(contatoSelecionado.telefone);
    this.contatoForm.patchValue(contatoSelecionado);
  }
}
