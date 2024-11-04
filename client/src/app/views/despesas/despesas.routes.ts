import { ActivatedRouteSnapshot, ResolveFn, Routes } from "@angular/router";
import { inject } from "@angular/core";
import { ListarDespesasViewModel, DetalhesDespesaViewModel } from "./models/despesa.models";
import { DespesaService } from "./services/despesas.service";
import { ListarDespesasComponent } from "./listar/listar-despesas.component";
import { InserirDespesaComponent } from "./inserir/inserir-despesa.component";
import { ExcluirDespesaComponent } from "./excluir/excluir-despesa.component";
import { EditarDespesaComponent } from "./editar/editar-despesa.component";
import { CategoriaService } from "../categorias/services/categoria.service";
import { ListarCategoriasViewModel } from "../categorias/models/categoria.models";

const listarDespesasResolver: ResolveFn<ListarDespesasViewModel[]> = () => {
  return inject(DespesaService).selecionarTodos();
};

const listarCategoriasResolver: ResolveFn<ListarCategoriasViewModel[]> = () => {
  return inject(CategoriaService).selecionarTodos();
};

const detalhesdespesaResolver: ResolveFn<DetalhesDespesaViewModel> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  return inject(DespesaService).selecionarPorId(id);
};

export const despesasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full'},
  { path: 'listar', component: ListarDespesasComponent, resolve: { despesas: listarDespesasResolver }},
  { path: 'inserir', component: InserirDespesaComponent, resolve: { categorias: listarCategoriasResolver }},
  { path: 'editar/:id', component: EditarDespesaComponent, resolve: { despesa: detalhesdespesaResolver, categorias: listarCategoriasResolver }},
  { path: 'excluir/:id', component: ExcluirDespesaComponent, resolve: { despesa: detalhesdespesaResolver }}
]
