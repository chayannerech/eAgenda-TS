export interface ListarTarefasViewModel {
  id: string;
  titulo: string;
  dataCriacao: string;
  prioridade: string;
  situacao: string;
}
export interface InserirTarefaViewModel {
  titulo: string;
  prioridade: number;
  itens: ItemTarefaViewModel;
}
export interface TarefaInseridaViewModel {
  id: string;
  titulo: string;
  prioridade: number;
  itens: ItemTarefaViewModel;
}
export interface EditarTarefaViewModel {
  titulo: string;
  prioridade: number;
  itens: ItemTarefaViewModel;
}
export interface TarefaEditadaViewModel {
  id: string;
  titulo: string;
  prioridade: number;
  itens: ItemTarefaViewModel;
}
export interface ItemTarefaViewModel {
  id: number;
  tituloTarefa: string;
  status: number;
  concluido: boolean;
}
export interface DetalhesTarefaViewModel {
  id: string;
  titulo: string;
  dataCriacao: string;
  dataConclusao: string;
  quantidadedeItens: number;
  percentualConcluido: number;
  prioridade: string;
  situacao: string;
  itens: ItensTarefaDetalhesViewModel
}
export interface ItensTarefaDetalhesViewModel {
  titulo: string;
  situacao: string;
}

export interface TarefaExcluidaViewModel {}
