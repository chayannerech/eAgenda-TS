import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { CompromissoService } from '../services/compromisso.service';
import { CompromissoInseridoViewModel, InserirCompromissoViewModel } from '../models/compromisso.models';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ContatoService } from '../../contatos/services/contato.service';
import { ListarContatosViewModel } from '../../contatos/models/contato.models';
import { Observable, PartialObserver } from 'rxjs';
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { SubmeterFormComponent } from "../../partials/submeter-form/submeter-form.component";

@Component({
  selector: 'app-inserir-compromissos',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    TituloComponent,
    SubmeterFormComponent
],
  templateUrl: './inserir-compromissos.component.html',
  styleUrl: '../styles/compromissos.scss'
})

export class InserirCompromissosComponent implements OnInit {
  compromissoForm: FormGroup;
  localDesabilitado: boolean;
  linkDesabilitado: boolean;
  contatos$?: Observable<ListarContatosViewModel[]>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private compromissoService: CompromissoService,
    private contatoService: ContatoService,
    private notificacao: NotificacaoService
  ) {
    this.localDesabilitado = false;
    this.linkDesabilitado = true;
    this.compromissoForm = this.fb.group({
      assunto: ['', [ Validators.required, Validators.minLength(3) ]],
      local: ['', [ Validators.required, Validators.minLength(3) ]],
      tipoLocal: ['1', [ Validators.required ]],
      link: ['', Validators.required],
      data: ['', Validators.required],
      horaInicio: ['', [ Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) ]],
      horaTermino: ['', [ Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) ]],
      contatoId: ['', [ Validators.required ]],
    });
  }

  ngOnInit(): void {
    this.contatos$ = this.contatoService.selecionarTodos();
    this.tipoDeLocalEscolhido({ value: '1' });
  }

  get assunto() { return this.compromissoForm.get('assunto'); }
  get local() { return this.compromissoForm.get('local'); }
  get tipoLocal() { return this.compromissoForm.get('tipoLocal'); }
  get link() { return this.compromissoForm.get('link'); }
  get data() { return this.compromissoForm.get('data'); }
  get horaInicio() { return this.compromissoForm.get('horaInicio'); }
  get horaTermino() { return this.compromissoForm.get('horaTermino'); }
  get contatoId() { return this.compromissoForm.get('contatoId'); }

  cadastrar() {
    if (this.compromissoForm.invalid) return;

    const novoCompromisso: InserirCompromissoViewModel = this.compromissoForm.value;
    const observer: PartialObserver<CompromissoInseridoViewModel> = {
      next: (novoCompromisso) => this.processarSucesso(novoCompromisso),
      error: (erro) => this.processarFalha(erro)
    }

    this.compromissoService.cadastrar(novoCompromisso).subscribe(observer);
  }

  public tipoDeLocalEscolhido(event: any) {
    if (event.value === '1') {
      this.local!.enable();
      this.link!.disable();

      this.local?.setValidators([Validators.required, Validators.minLength(3)]);
      this.link?.clearValidators();
      this.link?.setValue('');
    } else {
      this.local!.disable();
      this.link!.enable();

      this.link?.setValidators([Validators.required]);
      this.local?.clearValidators();
      this.local?.setValue('');
    }
  }

  private processarSucesso(novoCompromisso: CompromissoInseridoViewModel) {
    this.notificacao.sucesso(
      `O Compromisso '${novoCompromisso.assunto}' foi cadastrado com sucesso!`
    );

    this.router.navigate(['/compromissos']);
}

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}
