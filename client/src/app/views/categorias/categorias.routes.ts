import { ActivatedRouteSnapshot, ResolveFn, Routes } from "@angular/router";
import { InserirCategoriaComponent } from "./inserir/inserir-categorias.component";
import { ListarCategoriasComponent } from "./listar/listar-categorias.component";
import { EditarCategoriaComponent } from "./editar/editar-categoria.component";
import { ExcluirCategoriaComponent } from "./excluir/excluir-categorias.component";
import { DetalhesCategoriaViewModel, ListarCategoriasViewModel } from "./models/categoria.models";
import { CategoriaService } from "./services/categoria.service";
import { inject } from "@angular/core";

const listarCategoriasResolver: ResolveFn<ListarCategoriasViewModel[]> = () => {
  return inject(CategoriaService).selecionarTodos();
};

const detalhesCategoriaResolver: ResolveFn<DetalhesCategoriaViewModel> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  return inject(CategoriaService).selecionarPorId(id);
};


export const categoriasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full'},
  { path: 'listar', component: ListarCategoriasComponent, resolve: { categorias: listarCategoriasResolver }},
  { path: 'inserir', component: InserirCategoriaComponent},
  { path: 'editar/:id', component: EditarCategoriaComponent, resolve: { categoria: detalhesCategoriaResolver }},
  { path: 'excluir/:id', component: ExcluirCategoriaComponent, resolve: { categoria: detalhesCategoriaResolver }}
]
