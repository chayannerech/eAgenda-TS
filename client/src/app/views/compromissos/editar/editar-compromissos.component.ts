import { NgIf, NgForOf, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Observable, PartialObserver } from 'rxjs';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { ListarContatosViewModel } from '../../contatos/models/contato.models';
import { ContatoService } from '../../contatos/services/contato.service';
import { CompromissoEditadoViewModel, DetalhesCompromissoViewModel, EditarCompromissoViewModel, InserirCompromissoViewModel } from '../models/compromisso.models';
import { CompromissoService } from '../services/compromisso.service';
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { SubmeterFormComponent } from "../../partials/submeter-form/submeter-form.component";

@Component({
  selector: 'app-editar-compromissos',
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
  templateUrl: './editar-compromissos.component.html',
  styleUrl: '../styles/compromissos.scss'
})

export class EditarCompromissosComponent {
  compromissoForm: FormGroup;
  localDesabilitado: boolean;
  linkDesabilitado: boolean;
  contatos$?: Observable<ListarContatosViewModel[]>;

  constructor(
    private route: ActivatedRoute,
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
      contatoId: ['', [ Validators.required, Validators.minLength(3) ]],
    });
  }

  ngOnInit(): void {
    this.contatos$ = this.contatoService.selecionarTodos();

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

  public tipoDeLocalEscolhido(event: any) {
    if (event.value == '1') {
      this.local!.enable();
      this.local?.setValidators([Validators.required, Validators.minLength(3)]);
      this.tipoLocal?.setValue('1');

      this.link!.disable();
      this.link?.clearValidators();
      this.link?.setValue('');
    } else {
      this.link!.enable();
      this.link?.setValidators([Validators.required]);
      this.tipoLocal?.setValue('0');

      this.local!.disable();
      this.local?.clearValidators();
      this.local?.setValue('');
    }

    this.local?.updateValueAndValidity();
    this.link?.updateValueAndValidity();
  }

  private trazerValoresParaEdicao(compromissoSelecionado: DetalhesCompromissoViewModel) {
    compromissoSelecionado.horaInicio = this.compromissoService.formatarHorario(compromissoSelecionado.horaInicio);
    compromissoSelecionado.horaTermino = this.compromissoService.formatarHorario(compromissoSelecionado.horaTermino);

    this.compromissoForm.patchValue(compromissoSelecionado);

    this.contatoId?.setValue(compromissoSelecionado.contato.id);
    this.tipoDeLocalEscolhido({value: compromissoSelecionado.tipoLocal});
  }

  private processarSucesso(compromissoEditado: CompromissoEditadoViewModel) {
    this.notificacao.sucesso(
      `O Compromisso '${compromissoEditado.assunto}' foi cadastrado com sucesso!`
    );

    this.router.navigate(['/compromissos']);
}

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}
