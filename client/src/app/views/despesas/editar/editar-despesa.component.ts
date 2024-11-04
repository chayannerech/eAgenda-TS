import { NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder } from "@angular/forms";
import { MatError } from "@angular/material/form-field";
import { ActivatedRoute, Router } from "@angular/router";
import { PartialObserver } from "rxjs";
import { NotificacaoService } from "../../../core/notificacao/notificacao.service";
import { SubmeterFormComponent } from "../../partials/submeter-form/submeter-form.component";
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { DespesaEditadaViewModel, DespesaInseridaViewModel, DetalhesDespesaViewModel, EditarDespesaViewModel, InserirDespesaViewModel } from "../models/despesa.models";
import { DespesaService } from "../services/despesas.service";
import { ListarCategoriasViewModel } from "../../categorias/models/categoria.models";
import { InputDataComponent } from "../../partials/input-data/input-data.component";
import { InputRadioComponent } from "../../partials/input-radio/input-radio.component";
import { InputTextoComponent } from "../../partials/input-texto/input-texto.component";
import { InputCategoriasComponent } from "../partials/input-categorias/input-categorias.component";
import { InputValorComponent } from "../partials/input-valor/input-valor.component";

@Component({
  selector: 'app-editar-despesas',
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
  templateUrl: './editar-despesa.component.html',
  styleUrl: '../styles/despesas.scss'
})

export class EditarDespesaComponent {
  despesaForm: FormGroup;
  categorias?: ListarCategoriasViewModel[];
  categoriasSelecionadas: ListarCategoriasViewModel[];
  semCategorias: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private despesaService: DespesaService,
    private notificacao: NotificacaoService
  ) {
    this.categoriasSelecionadas = [];
    this.semCategorias = false;
    this.despesaForm = this.fb.group({ descricao: '', valor: 0, data: '', formaPagamento: 0 });
  }

  ngOnInit(): void {
    const despesa = this.route.snapshot.data['despesa'];
    this.categorias = this.route.snapshot.data['categorias'];

    this.trazerValoresParaEdicao(despesa);
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

  editar() {
    if (this.validarForm()) return;

    const id = this.route.snapshot.params['id'];
    if (!id) return this.notificacao.erro('Não foi possível encontrar o id requisitado');

    const despesaEditada: EditarDespesaViewModel = this.despesaForm.value;
    const observer: PartialObserver<DespesaEditadaViewModel> = {
      next: (despesa) => this.processarSucesso(despesa),
      error: (erro) => this.processarFalha(erro)
    }

    despesaEditada.categoriasSelecionadas = [];
    this.categoriasSelecionadas.forEach(x => despesaEditada.categoriasSelecionadas.push(x.id))

    this.despesaService.editar(id, despesaEditada).subscribe(observer);
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
      `A despesa '${novaDespesa.descricao}' foi editada com sucesso!`
    );

    this.router.navigate(['/despesas']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.message);
  }

  private trazerValoresParaEdicao(despesa: DetalhesDespesaViewModel) {
    this.despesaForm.patchValue(despesa);

    for (let cat of this.categorias!)
      if (despesa.categorias.includes(cat.titulo))
        this.categoriasSelecionadas.push(cat);

    for (let cat of this.categoriasSelecionadas)
      this.categorias = this.categorias!.filter(c => c !== cat);

    if (despesa.formaPagamento == 'Pix')
      this.formaPagamento?.setValue(0);
    else if (despesa.formaPagamento == 'Dinheiro')
      this.formaPagamento?.setValue(1);
    else
      this.formaPagamento?.setValue(2);
  }
}
