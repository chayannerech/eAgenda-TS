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
  itens: ItemTarefaViewModel[];
}
export interface TarefaInseridaViewModel {
  id: string;
  titulo: string;
  prioridade: number;
  itens: ItemTarefaViewModel[];
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
export interface DetalhesTarefaViewModel {
  id: string;
  titulo: string;
  dataConclusao: string;
  prioridade: string;
  quantidadedeItens: number;
  percentualConcluido: number;
  itens: ItemTarefaViewModel[]
}

export interface ItemTarefaViewModel {
  id: string;
  titulo: string;
  status: number;
  concluido: boolean;
}
export interface ItensTarefaDetalhesViewModel {
  titulo: string;
  situacao: string;
}

export interface TarefaExcluidaViewModel {}
