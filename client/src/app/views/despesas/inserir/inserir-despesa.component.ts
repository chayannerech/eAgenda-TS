import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { DespesaInseridaViewModel, InserirDespesaViewModel } from '../models/despesa.models';
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
import { DespesaService } from '../services/despesas.service';

@Component({
  selector: 'app-inserir-despesas',
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
  templateUrl: './inserir-despesa.component.html',
  styleUrl: '../styles/despesas.scss'
})

export class InserirDespesaComponent implements OnInit {
  despesaForm: FormGroup;
  localDesabilitado: boolean;
  linkDesabilitado: boolean;
  contatos$?: Observable<ListarContatosViewModel[]>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private despesaService: DespesaService,
    private contatoService: ContatoService,
    private notificacao: NotificacaoService
  ) {
    this.localDesabilitado = false;
    this.linkDesabilitado = true;
    this.despesaForm = this.fb.group({
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

  get assunto() { return this.despesaForm.get('assunto'); }
  get local() { return this.despesaForm.get('local'); }
  get tipoLocal() { return this.despesaForm.get('tipoLocal'); }
  get link() { return this.despesaForm.get('link'); }
  get data() { return this.despesaForm.get('data'); }
  get horaInicio() { return this.despesaForm.get('horaInicio'); }
  get horaTermino() { return this.despesaForm.get('horaTermino'); }
  get contatoId() { return this.despesaForm.get('contatoId'); }

  cadastrar() {
    if (this.despesaForm.invalid) return;

    const novaDespesa: InserirDespesaViewModel = this.despesaForm.value;
    const observer: PartialObserver<DespesaInseridaViewModel> = {
      next: (novaDespesa) => this.processarSucesso(novaDespesa),
      error: (erro) => this.processarFalha(erro)
    }

      this.despesaService.cadastrar(novaDespesa).subscribe(observer);
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

  private processarSucesso(novaDespesa: DespesaInseridaViewModel) {
    this.notificacao.sucesso(
      `O Despesa '${novaDespesa.descricao}' foi cadastrado com sucesso!`
    );

    this.router.navigate(['/despesas']);
}

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}
