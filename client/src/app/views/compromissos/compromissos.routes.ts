import { ActivatedRouteSnapshot, ResolveFn, Routes } from "@angular/router";
import { ListarCompromissosComponent } from "./listar/listar-compromissos.component";
import { InserirCompromissosComponent } from "./inserir/inserir-compromissos.component";
import { EditarCompromissosComponent } from "./editar/editar-compromissos.component";
import { ExcluirCompromissoComponent } from "./excluir/excluir-compromisso.component";
import { DetalhesCompromissoViewModel, ListarCompromissosViewModel } from "./models/compromisso.models";
import { CompromissoService } from "./services/compromisso.service";
import { inject } from "@angular/core";
import { ListarContatosViewModel } from "../contatos/models/contato.models";
import { ContatoService } from "../contatos/services/contato.service";

const listarCompromissosResolver: ResolveFn<ListarCompromissosViewModel[]> = () => {
  return inject(CompromissoService).selecionarTodos();
};

const listarContatosResolver: ResolveFn<ListarContatosViewModel[]> = () => {
  return inject(ContatoService).selecionarTodos();
};

const detalhesCompromissoResolver: ResolveFn<DetalhesCompromissoViewModel> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  return inject(CompromissoService).selecionarPorId(id);
};

export const compromissosRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full'},
  { path: 'listar', component: ListarCompromissosComponent, resolve: { compromissos: listarCompromissosResolver }},
  { path: 'inserir', component: InserirCompromissosComponent, resolve: { contatos: listarContatosResolver }},
  { path: 'editar/:id', component: EditarCompromissosComponent, resolve: { compromisso: detalhesCompromissoResolver, contatos: listarContatosResolver }},
  { path: 'excluir/:id', component: ExcluirCompromissoComponent, resolve: { compromisso: detalhesCompromissoResolver, contatos: listarContatosResolver }}
]
