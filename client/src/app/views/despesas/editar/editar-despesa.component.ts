import { NgIf, NgForOf, AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { RouterLink, ActivatedRoute, Router } from "@angular/router";
import { Observable, PartialObserver } from "rxjs";
import { NotificacaoService } from "../../../core/notificacao/notificacao.service";
import { ListarContatosViewModel } from "../../contatos/models/contato.models";
import { ContatoService } from "../../contatos/services/contato.service";
import { SubmeterFormComponent } from "../../partials/submeter-form/submeter-form.component";
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { EditarDespesaViewModel, DetalhesDespesaViewModel, DespesaEditadaViewModel } from "../models/despesa.models";
import { DespesaService } from "../services/despesas.service";

@Component({
  selector: 'app-editar-despesas',
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
  templateUrl: './editar-despesa.component.html',
  styleUrl: '../styles/despesas.scss'
})

export class EditarDespesaComponent {
  despesaForm: FormGroup;
  localDesabilitado: boolean;
  linkDesabilitado: boolean;
  contatos$?: Observable<ListarContatosViewModel[]>;

  constructor(
    private route: ActivatedRoute,
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
      contatoId: ['', [ Validators.required, Validators.minLength(3) ]],
    });
  }

  ngOnInit(): void {
    this.contatos$ = this.contatoService.selecionarTodos();

    const despesa = this.route.snapshot.data['despesa'];
    this.trazerValoresParaEdicao(despesa);
  }

  get assunto() { return this.despesaForm.get('assunto'); }
  get local() { return this.despesaForm.get('local'); }
  get tipoLocal() { return this.despesaForm.get('tipoLocal'); }
  get link() { return this.despesaForm.get('link'); }
  get data() { return this.despesaForm.get('data'); }
  get horaInicio() { return this.despesaForm.get('horaInicio'); }
  get horaTermino() { return this.despesaForm.get('horaTermino'); }
  get contatoId() { return this.despesaForm.get('contatoId'); }

  editar() {
    if (this.despesaForm.invalid) return;

    const id = this.route.snapshot.params['id'];
    if (!id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');

    const despesaEditado: EditarDespesaViewModel = this.despesaForm.value;
    const observer: PartialObserver<DespesaEditadaViewModel> = {
      next: (despesaEditado) => this.processarSucesso(despesaEditado),
      error: (erro) => this.processarFalha(erro)
    }

    this.despesaService.editar(id, despesaEditado).subscribe(observer);
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

  private trazerValoresParaEdicao(despesaSelecionada: DetalhesDespesaViewModel) {
    this.despesaForm.patchValue(despesaSelecionada);
  }

  private processarSucesso(despesaEditado: DespesaEditadaViewModel) {
    this.notificacao.sucesso(
      `O Despesa '${despesaEditado.descricao}' foi cadastrado com sucesso!`
    );

    this.router.navigate(['/despesas']);
}

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}
