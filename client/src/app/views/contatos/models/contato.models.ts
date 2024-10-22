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
export interface ContatoInserida {
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
export interface ContatoEditada {
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

export interface ContatoExcluida {}
