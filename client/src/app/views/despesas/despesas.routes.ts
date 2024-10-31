import { ActivatedRouteSnapshot, ResolveFn, Routes } from "@angular/router";
import { inject } from "@angular/core";
import { ListarDespesasViewModel, DetalhesDespesaViewModel } from "./models/despesa.models";
import { DespesaService } from "./services/despesas.service";

const listarDespesasResolver: ResolveFn<ListarDespesasViewModel[]> = () => {
  return inject(DespesaService).selecionarTodos();
};

const detalhesdespesaResolver: ResolveFn<DetalhesDespesaViewModel> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  return inject(DespesaService).selecionarPorId(id);
};

export const despesasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full'},
  { path: 'listar', component: ListarDespesasComponent, resolve: { despesas: listarDespesasResolver }},
  { path: 'inserir', component: InserirDespesaComponent},
  { path: 'editar/:id', component: EditarDespesaComponent, resolve: { despesa: detalhesdespesaResolver }},
  { path: 'excluir/:id', component: ExcluirDespesaComponent, resolve: { despesa: detalhesdespesaResolver }}
]
