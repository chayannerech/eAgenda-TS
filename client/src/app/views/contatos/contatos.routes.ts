import { ActivatedRouteSnapshot, ResolveFn, Routes } from "@angular/router";
import { ListarContatosComponent } from "./listar/listar-contato.component";
import { InserirContatoComponent } from "./inserir/inserir-contato.component";
import { EditarContatoComponent } from "./editar/editar-contato.component";
import { ExcluirContatoComponent } from "./excluir/excluir-contato.component";
import { inject } from "@angular/core";
import { ContatoService } from "./services/contato.service";
import { DetalhesContatoViewModel, ListarContatosViewModel } from "./models/contato.models";

const listarContatosResolver: ResolveFn<ListarContatosViewModel[]> = () => {
  return inject(ContatoService).selecionarTodos();
};

const detalhesContatoResolver: ResolveFn<DetalhesContatoViewModel> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  return inject(ContatoService).selecionarPorId(id);
};

export const contatosRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full'},
  { path: 'listar', component: ListarContatosComponent, resolve: { contatos: listarContatosResolver }},
  { path: 'inserir', component: InserirContatoComponent},
  { path: 'editar/:id', component: EditarContatoComponent, resolve: { contato: detalhesContatoResolver }},
  { path: 'excluir/:id', component: ExcluirContatoComponent, resolve: { contato: detalhesContatoResolver }}
]
