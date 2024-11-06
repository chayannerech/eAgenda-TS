import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { CompromissoService } from '../services/compromisso.service';
import { CompromissoInseridoViewModel, InserirCompromissoViewModel } from '../models/compromisso.models';
import { NgIf } from '@angular/common';
import { ListarContatosViewModel } from '../../contatos/models/contato.models';
import { PartialObserver } from 'rxjs';
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { SubmeterFormComponent } from "../../partials/submeter-form/submeter-form.component";
import { InputTextoComponent } from "../../partials/input-texto/input-texto.component";
import { InputRadioComponent } from "../../partials/input-radio/input-radio.component";
import { InputDataComponent } from "../../partials/input-data/input-data.component";
import { InputHorarioComponent } from "../partials/input-horario/input-horario.component";
import { SelectContatosComponent } from "../partials/select-contatos/select-contatos.component";

@Component({
  selector: 'app-inserir-compromissos',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    TituloComponent,
    SubmeterFormComponent,
    InputTextoComponent,
    InputRadioComponent,
    InputDataComponent,
    InputHorarioComponent,
    SelectContatosComponent,
],
  templateUrl: './inserir-compromissos.component.html',
  styleUrl: '../styles/compromissos.scss'
})

export class InserirCompromissosComponent implements OnInit {
  compromissoForm: FormGroup;
  localDesabilitado: boolean;
  linkDesabilitado: boolean;
  contatos?: ListarContatosViewModel[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private compromissoService: CompromissoService,
    private notificacao: NotificacaoService
  ) {
    this.localDesabilitado = false;
    this.linkDesabilitado = true;
    this.compromissoForm = this.fb.group({ assunto: '', tipoLocal: 0, data: '', horaInicio: '', horaTermino: '', contatoId: '', local: '', link: '' });
  }

  ngOnInit(): void {
    this.contatos = this.route.snapshot.data['contatos'];
    this.tipoDeLocalEscolhido();
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
    if (this.tipoLocal?.value == 1 && this.local?.value == ''){
      this.local.setErrors(Validators.required);
    }

    if (this.compromissoForm.invalid) return;

    const novoCompromisso: InserirCompromissoViewModel = this.compromissoForm.value;
    const observer: PartialObserver<CompromissoInseridoViewModel> = {
      next: (novoCompromisso) => this.processarSucesso(novoCompromisso),
      error: (erro) => this.processarFalha(erro)
    }

    this.compromissoService.cadastrar(novoCompromisso).subscribe(observer);
  }

  public tipoDeLocalEscolhido() {
    if (this.tipoLocal?.value == 1) {
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
      `O compromisso '${novoCompromisso.assunto}' foi cadastrado com sucesso!`
    );

    this.router.navigate(['/compromissos']);
}

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}
