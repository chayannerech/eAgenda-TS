import { Routes } from "@angular/router";
import { InserirCategoriaComponent } from "./inserir/inserir-categorias.component";
import { ListarCategoriasComponent } from "./listar/listar-categorias.component";
import { EditarCategoriaComponent } from "./editar/editar-categorias.component";
import { ExcluirCategoriaComponent } from "./excluir/excluir-categorias.component";

export const categoriasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full'},
  { path: 'listar', component: ListarCategoriasComponent},
  { path: 'inserir', component: InserirCategoriaComponent},
  { path: 'editar/:id', component: EditarCategoriaComponent},
  { path: 'excluir/:id', component: ExcluirCategoriaComponent}
]
