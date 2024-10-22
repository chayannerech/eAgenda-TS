export interface ListarContatos {
  id: number;
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
  id: number;
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
  id: number;
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}
export interface DetalhesContato {
  id: number;
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}

export interface ContatoExcluido {}
