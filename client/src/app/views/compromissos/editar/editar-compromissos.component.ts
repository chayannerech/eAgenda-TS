import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { ListarContatosViewModel } from '../../contatos/models/contato.models';
import { CompromissoEditadoViewModel, DetalhesCompromissoViewModel, EditarCompromissoViewModel } from '../models/compromisso.models';
import { CompromissoService } from '../services/compromisso.service';
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { SubmeterFormComponent } from "../../partials/submeter-form/submeter-form.component";
import { InputTextoComponent } from "../../partials/input-texto/input-texto.component";
import { InputRadioComponent } from "../../partials/input-radio/input-radio.component";
import { InputDataComponent } from "../../partials/input-data/input-data.component";
import { InputHorarioComponent } from "../partials/input-horario/input-horario.component";
import { SelectContatosComponent } from "../partials/select-contatos/select-contatos.component";

@Component({
  selector: 'app-editar-compromissos',
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
  templateUrl: './editar-compromissos.component.html',
  styleUrl: '../styles/compromissos.scss'
})

export class EditarCompromissosComponent {
  compromissoForm: FormGroup;
  localDesabilitado: boolean;
  linkDesabilitado: boolean;
  contatos?: ListarContatosViewModel[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private compromissoService: CompromissoService,
    private notificacao: NotificacaoService
  ) {
    this.localDesabilitado = false;
    this.linkDesabilitado = true;
    this.compromissoForm = this.fb.group({ assunto: '', local: '', tipoLocal: '', link: '', data: '', horaInicio: '', horaTermino: '', contatoId: '' });
  }

  ngOnInit(): void {
    this.contatos = this.route.snapshot.data['contatos'];
    const compromisso = this.route.snapshot.data['compromisso'];
    this.trazerValoresParaEdicao(compromisso);
  }

  get assunto() { return this.compromissoForm.get('assunto'); }
  get local() { return this.compromissoForm.get('local'); }
  get tipoLocal() { return this.compromissoForm.get('tipoLocal'); }
  get link() { return this.compromissoForm.get('link'); }
  get data() { return this.compromissoForm.get('data'); }
  get horaInicio() { return this.compromissoForm.get('horaInicio'); }
  get horaTermino() { return this.compromissoForm.get('horaTermino'); }
  get contatoId() { return this.compromissoForm.get('contatoId'); }

  editar() {
    if (this.compromissoForm.invalid) return;

    const id = this.route.snapshot.params['id'];
    if (!id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');

    const compromissoEditado: EditarCompromissoViewModel = this.compromissoForm.value;
    const observer: PartialObserver<CompromissoEditadoViewModel> = {
      next: (compromissoEditado) => this.processarSucesso(compromissoEditado),
      error: (erro) => this.processarFalha(erro)
    }

    this.compromissoService.editar(id, compromissoEditado).subscribe(observer);
  }

  public tipoDeLocalEscolhido() {
    if (this.tipoLocal?.value === 1) {
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

  private trazerValoresParaEdicao(compromissoSelecionado: DetalhesCompromissoViewModel) {
    compromissoSelecionado.horaInicio = this.compromissoService.formatarHorario(compromissoSelecionado.horaInicio);
    compromissoSelecionado.horaTermino = this.compromissoService.formatarHorario(compromissoSelecionado.horaTermino);

    this.compromissoForm.patchValue(compromissoSelecionado);

    this.contatoId?.setValue(compromissoSelecionado.contato.id);
    this.tipoDeLocalEscolhido();
  }

  private processarSucesso(compromissoEditado: CompromissoEditadoViewModel) {
    this.notificacao.sucesso(
      `O compromisso '${compromissoEditado.assunto}' foi editado com sucesso!`
    );

    this.router.navigate(['/compromissos']);
}

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}
