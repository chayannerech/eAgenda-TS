export interface ListarTarefasViewModel {
  id: string;
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}
export interface InserirTarefaViewModel {
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}
export interface TarefaInseridaViewModel {
  id: string;
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}
export interface EditarTarefaViewModel {
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}
export interface TarefaEditadaViewModel {
  id: string;
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}
export interface DetalhesTarefaViewModel {
  id: string;
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}

export interface TarefaExcluidaViewModel {}
