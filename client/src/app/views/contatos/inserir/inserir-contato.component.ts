import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { ContatoInseridoViewModel, InserirContatoViewModel } from '../models/contato.models';
import { ContatoService } from '../services/contato.service';
import { PartialObserver } from 'rxjs';
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { SubmeterFormComponent } from "../../partials/submeter-form/submeter-form.component";
import { InputTextoComponent } from "../../partials/input-texto/input-texto.component";
import { InputEmailComponent } from "../../partials/input-email/input-email.component";
import { InputTelefoneComponent } from "../partials/input-telefone/input-telefone.component";

@Component({
  selector: 'app-inserir-contato',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TituloComponent,
    SubmeterFormComponent,
    InputTextoComponent,
    InputEmailComponent,
    InputTelefoneComponent
],
  templateUrl: './inserir-contato.component.html',
  styleUrl: '../styles/contatos.scss',
})

export class InserirContatoComponent {
  contatoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private contatoService: ContatoService,
    private notificacao: NotificacaoService
  ) {
    this.contatoForm = this.fb.group({ nome: '' , email: '', empresa: '', cargo: '', telefone: '' });
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
