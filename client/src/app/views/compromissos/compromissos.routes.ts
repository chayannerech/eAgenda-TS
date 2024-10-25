import { ResolveFn, Routes } from "@angular/router";
import { ListarCompromissosComponent } from "./listar/listar-compromissos.component";
import { InserirCompromissosComponent } from "./inserir/inserir-compromissos.component";
import { EditarCompromissosComponent } from "./editar/editar-compromissos.component";
import { ExcluirCompromissoComponent } from "./excluir/excluir-compromisso.component";
import { ListarCompromissosViewModel } from "./models/compromisso.models";
import { CompromissoService } from "./services/compromisso.service";
import { inject } from "@angular/core";

const listarCompromissosResolver: ResolveFn<ListarCompromissosViewModel[]> = () => {
  return inject(CompromissoService).selecionarTodos();
};


export const compromissosRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full'},
  { path: 'listar', component: ListarCompromissosComponent, resolve: { compromissos: listarCompromissosResolver }},
  { path: 'inserir', component: InserirCompromissosComponent},
  { path: 'editar/:id', component: EditarCompromissosComponent},
  { path: 'excluir/:id', component: ExcluirCompromissoComponent}
]
