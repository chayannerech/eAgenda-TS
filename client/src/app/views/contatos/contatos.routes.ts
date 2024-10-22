import { Routes } from "@angular/router";
import { ListarContatosComponent } from "./listar/listar-contato.component";
import { InserirContatoComponent } from "./inserir/inserir-contato.component";
import { EditarContatoComponent } from "./editar/editar-contato.component";
import { ExcluirContatoComponent } from "./excluir/excluir-contato.component";

export const contatosRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full'},
  { path: 'listar', component: ListarContatosComponent},
  { path: 'inserir', component: InserirContatoComponent},
  { path: 'editar/:id', component: EditarContatoComponent},
  { path: 'excluir/:id', component: ExcluirContatoComponent}
]
