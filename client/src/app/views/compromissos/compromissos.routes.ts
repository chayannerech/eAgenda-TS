import { Routes } from "@angular/router";
import { ListarCompromissosComponent } from "./listar/listar-compromissos.component";
import { InserirCompromissosComponent } from "./inserir/inserir-compromissos.component";

export const compromissosRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full'},
  { path: 'listar', component: ListarCompromissosComponent},
  { path: 'inserir', component: InserirCompromissosComponent},
  // { path: 'editar/:id', component: EditarContatoComponent},
  // { path: 'excluir/:id', component: ExcluirContatoComponent}
]
