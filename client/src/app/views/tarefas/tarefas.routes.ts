import { ActivatedRouteSnapshot, ResolveFn, Routes } from "@angular/router";
import { inject } from "@angular/core";
import { TarefaService } from "./services/tarefa.service";
import { ListarTarefasViewModel, DetalhesTarefaViewModel } from "./models/tarefa.models";
import { ListarTarefasComponent } from "./listar/listar-tarefas.component";

const listarTarefasResolver: ResolveFn<ListarTarefasViewModel[]> = () => {
  return inject(TarefaService).selecionarTodos();
};

const detalhesTarefaResolver: ResolveFn<DetalhesTarefaViewModel> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  return inject(TarefaService).selecionarPorId(id);
};

export const tarefasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full'},
  { path: 'listar', component: ListarTarefasComponent, resolve: { tarefas: listarTarefasResolver }},
  //{ path: 'inserir', component: InserirTarefaComponent},
  //{ path: 'editar/:id', component: EditarTarefaComponent, resolve: { tarefa: detalhesTarefaResolver }},
  //{ path: 'excluir/:id', component: ExcluirTarefaComponent, resolve: { tarefa: detalhesTarefaResolver }}
]
