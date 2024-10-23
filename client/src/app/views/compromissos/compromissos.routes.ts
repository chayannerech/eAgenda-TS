import { Routes } from "@angular/router";
import { ListarCompromissosComponent } from "./listar/listar-compromissos.component";
import { InserirCompromissosComponent } from "./inserir/inserir-compromissos.component";
import { EditarCompromissosComponent } from "./editar/editar-compromissos.component";

export const compromissosRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full'},
  { path: 'listar', component: ListarCompromissosComponent},
  { path: 'inserir', component: InserirCompromissosComponent},
  { path: 'editar/:id', component: EditarCompromissosComponent},
  // { path: 'excluir/:id', component: ExcluirContatoComponent}
]
