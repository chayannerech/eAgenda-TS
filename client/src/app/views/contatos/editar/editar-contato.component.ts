import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { ContatoEditadoViewModel, DetalhesContatoViewModel, EditarContatoViewModel } from '../models/contato.models';
import { ContatoService } from '../services/contato.service';
import { PartialObserver } from 'rxjs';
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { SubmeterFormComponent } from "../../partials/submeter-form/submeter-form.component";
import { InputEmailComponent } from '../../partials/input-email/input-email.component';
import { InputTextoComponent } from '../../partials/input-texto/input-texto.component';
import { InputTelefoneComponent } from '../partials/input-telefone/input-telefone.component';

@Component({
  selector: 'app-editar-contato',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TituloComponent,
    SubmeterFormComponent,
    InputTextoComponent,
    InputEmailComponent,
    InputTelefoneComponent
  ],
  templateUrl: './editar-contato.component.html',
  styleUrl: '../styles/contatos.scss',
})

export class EditarContatoComponent implements OnInit {
  contatoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private contatoService: ContatoService,
    private notificacao: NotificacaoService
  ) {
    this.contatoForm = this.fb.group({ nome: '' , email: '', empresa: '', cargo: '', telefone: '' });
  }

  ngOnInit(): void {
    const contato = this.route.snapshot.data['contato'];
    this.trazerValoresParaEdicao(contato);
  }

  get nome() { return this.contatoForm.get('nome'); }
  get email() { return this.contatoForm.get('email'); }
  get empresa() { return this.contatoForm.get('empresa'); }
  get cargo() { return this.contatoForm.get('cargo'); }
  get telefone() { return this.contatoForm.get('telefone'); }

  editar() {
    if (this.contatoForm.invalid) return;

    const id = this.route.snapshot.params['id'];
    if (!id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');

    const contato: EditarContatoViewModel = this.contatoForm.value;
    const observer: PartialObserver<ContatoEditadoViewModel> = {
      next: (contato) => this.processarSucesso(contato),
      error: (erro) => this.processarFalha(erro)
    }

    this.contatoService.editar(id, contato).subscribe(observer);
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
