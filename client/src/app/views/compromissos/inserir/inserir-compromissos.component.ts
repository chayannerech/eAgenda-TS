import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { formatarComponente, toTitleCase } from '../../../app.component';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { CompromissoService } from '../services/compromisso.service';
import { InserirCompromisso } from '../models/compromisso.models';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption, MatOptionModule } from '@angular/material/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ContatoService } from '../../contatos/services/contato.service';
import { ListarContatos } from '../../contatos/models/contato.models';
import { Observable, tap } from 'rxjs';

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
    MatSelectModule
  ],
  templateUrl: './inserir-compromissos.component.html',
  styleUrl: '../styles/compromissos.scss'
})

export class InserirCompromissosComponent implements OnInit {
  compromissoForm: FormGroup;
  localDesabilitado: boolean;
  linkDesabilitado: boolean;
  contatos$?: Observable<ListarContatos[]>;

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
      tipoLocal: ['0', [ Validators.required ]],
      link: ['', Validators.required],
      data: ['', Validators.required],
      horaInicio: ['', [ Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) ]],
      horaTermino: ['', [ Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) ]],
      contatoId: ['', [ Validators.required, Validators.minLength(3) ]],
    });
  }

  ngOnInit(): void {
    this.contatos$ = this.contatoService.selecionarTodos();
    this.tipoDeLocalEscolhido({ value: '0' });

    this.tipoLocal!.valueChanges.subscribe(value => {
      this.tipoDeLocalEscolhido(value);
    });
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

    const novoCompromisso: InserirCompromisso = this.compromissoForm.value;
    formatarComponente(novoCompromisso);
    this.ajustarTipoDeLocal(novoCompromisso);

    this.compromissoService.cadastrar(novoCompromisso).subscribe(() => {
      this.notificacao.sucesso(
        `O Compromisso '${novoCompromisso.assunto}' foi cadastrado com sucesso!`
      );

      this.router.navigate(['/compromissos']);
    });
  }

  private ajustarTipoDeLocal(novoCompromisso: InserirCompromisso) {
    if (novoCompromisso.tipoLocal == 0) {
      novoCompromisso.link = "https://www.google.com.br/";
      novoCompromisso.tipoLocal = 0;
    } else {
      novoCompromisso.local = "nulo";
      novoCompromisso.tipoLocal = 1;
    }
  }

  tipoDeLocalEscolhido(event: any) {
    if (event.value === '0') {
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

    this.local?.updateValueAndValidity();
    this.link?.updateValueAndValidity();
  }
}
