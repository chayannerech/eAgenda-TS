import { NgIf, NgForOf, AsyncPipe, NgStyle } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { RouterLink, Router } from "@angular/router";
import { PartialObserver, reduce } from "rxjs";
import { NotificacaoService } from "../../../core/notificacao/notificacao.service";
import { ListarCategoriasViewModel } from "../../categorias/models/categoria.models";
import { CategoriaService } from "../../categorias/services/categoria.service";
import { SubmeterFormComponent } from "../../partials/submeter-form/submeter-form.component";
import { TituloComponent } from "../../partials/titulo/titulo.component";
import { InserirDespesaViewModel, DespesaInseridaViewModel } from "../models/despesa.models";
import { DespesaService } from "../services/despesas.service";
import { MatTooltip } from "@angular/material/tooltip";

@Component({
  selector: 'app-inserir-despesas',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    NgStyle,
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
    MatTooltip,
    TituloComponent,
    SubmeterFormComponent
],
  templateUrl: './inserir-despesa.component.html',
  styleUrl: '../styles/despesas.scss'
})

export class InserirDespesaComponent implements OnInit {
  despesaForm: FormGroup;
  categorias?: ListarCategoriasViewModel[];
  categoriasSelecionadas: ListarCategoriasViewModel[];
  semCategorias: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private despesaService: DespesaService,
    private categoriaService: CategoriaService,
    private notificacao: NotificacaoService
  ) {
    this.categoriasSelecionadas = [];
    this.semCategorias = false;
    this.despesaForm = this.fb.group({
      descricao: ['', [ Validators.required, Validators.minLength(3) ]],
      valor: [0, [ Validators.required, Validators.min(1), Validators.max(100000) ]],
      data: ['', Validators.required],
      formaPagamento: ['1', [ Validators.required ]],
      categoriasSelecionadasNome: ['',],
    });
  }

  ngOnInit(): void {
    this.categoriaService.selecionarTodos().subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  get descricao() { return this.despesaForm.get('descricao'); }
  get valor() { return this.despesaForm.get('valor'); }
  get data() { return this.despesaForm.get('data'); }
  get formaPagamento() { return this.despesaForm.get('formaPagamento'); }
  get categoriasSelecionadasNome() { return this.despesaForm.get('categorias'); }

  selecionarCategoria(categoria: ListarCategoriasViewModel) {
    this.categoriasSelecionadas.push(categoria);
    this.categorias = this.categorias!.filter(cat => cat !== categoria);
  }

  removerCategoria(categoria: ListarCategoriasViewModel) {
    this.categoriasSelecionadas = this.categoriasSelecionadas.filter(cat => cat !== categoria);
    this.categorias!.push(categoria);
  }

  incrementar() {
    const currentValue = this.valor?.value || 0;
    this.valor?.setValue(currentValue + 1);
  }
  decrementar() {
    const currentValue = this.valor?.value || 0;
    if (currentValue > 0) {
      this.valor?.setValue(currentValue - 1);
    }
  }

  cadastrar() {
    if (this.validarForm()) return;

    const novaDespesa: InserirDespesaViewModel = this.despesaForm.value;
    novaDespesa.categoriasSelecionadas = [];
    this.categoriasSelecionadas.forEach(x => novaDespesa.categoriasSelecionadas.push(x.id))

    console.log(novaDespesa);

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
