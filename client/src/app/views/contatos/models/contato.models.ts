export interface ListarContatosViewModel {
  id: string;
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}
export interface InserirContato {
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}
export interface ContatoInserido {
  id: string;
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}
export interface EditarContato {
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}
export interface ContatoEditado {
  id: string;
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}
export interface DetalhesContato {
  id: string;
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}

export interface ContatoExcluido {}
