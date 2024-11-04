import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatError } from "@angular/material/form-field";
import { ActivatedRoute, Router } from "@angular/router";
import { PartialObserver } from "rxjs";
import { NotificacaoService } from "../../../core/notificacao/notificacao.service";
import { ListarCategoriasViewModel } from "../../categorias/models/categoria.models";
import { SubmeterFormComponent } from "../../partials/submeter-form/submeter-form.component";
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { InserirDespesaViewModel, DespesaInseridaViewModel } from "../models/despesa.models";
import { DespesaService } from "../services/despesas.service";
import { provideNgxMask } from "ngx-mask";
import { InputRadioComponent } from "../../partials/input-radio/input-radio.component";
import { InputTextoComponent } from "../../partials/input-texto/input-texto.component";
import { InputDataComponent } from "../../partials/input-data/input-data.component";
import { InputValorComponent } from "../partials/input-valor/input-valor.component";
import { InputCategoriasComponent } from "../partials/input-categorias/input-categorias.component";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-inserir-despesas',
  standalone: true,
  imports: [
    NgIf,
    MatError,
    ReactiveFormsModule,
    TituloComponent,
    InputTextoComponent,
    InputRadioComponent,
    InputDataComponent,
    InputValorComponent,
    InputCategoriasComponent,
    SubmeterFormComponent,
],
  templateUrl: './inserir-despesa.component.html',
  styleUrl: '../styles/despesas.scss',
  providers: [provideNgxMask()]
})

export class InserirDespesaComponent implements OnInit {
  despesaForm: FormGroup;
  categorias?: ListarCategoriasViewModel[];
  categoriasSelecionadas: ListarCategoriasViewModel[];
  semCategorias: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private despesaService: DespesaService,
    private notificacao: NotificacaoService
  ) {
    this.categoriasSelecionadas = [];
    this.semCategorias = false;
    this.despesaForm = this.fb.group({ descricao: '', valor: 0, data: '', formaPagamento: 0 });
  }

  ngOnInit(): void {
    this.categorias = this.route.snapshot.data['categorias'];
  }

  get descricao() { return this.despesaForm.get('descricao'); }
  get valor() { return this.despesaForm.get('valor'); }
  get data() { return this.despesaForm.get('data'); }
  get formaPagamento() { return this.despesaForm.get('formaPagamento'); }

  selecionarCategoria(categoria: ListarCategoriasViewModel) {
    this.categoriasSelecionadas.push(categoria);
    this.categorias = this.categorias!.filter(cat => cat !== categoria);
    this.semCategorias = false;
  }

  removerCategoria(categoria: ListarCategoriasViewModel) {
    this.categoriasSelecionadas = this.categoriasSelecionadas.filter(cat => cat !== categoria);
    this.categorias!.push(categoria);
  }

  cadastrar() {
    if (this.validarForm()) return;

    const novaDespesa: InserirDespesaViewModel = this.despesaForm.value;
    novaDespesa.categoriasSelecionadas = [];
    this.categoriasSelecionadas.forEach(x => novaDespesa.categoriasSelecionadas.push(x.id))

    const observer: PartialObserver<DespesaInseridaViewModel> = {
      next: (novaDespesa) => this.processarSucesso(novaDespesa),
      error: (erro) => this.processarFalha(erro)
    }

      this.despesaService.cadastrar(novaDespesa).subscribe(observer);
  }

  private validarForm(): Boolean {
    if (this.categoriasSelecionadas.length == 0) {
      this.semCategorias = true;
      return true;
    }
    if (this.despesaForm.invalid) return true;
    return false;
  }

  private processarSucesso(novaDespesa: DespesaInseridaViewModel) {
    this.notificacao.sucesso(
      `A Despesa '${novaDespesa.descricao}' foi cadastrada com sucesso!`
    );

    this.router.navigate(['/despesas']);
}

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }
}
