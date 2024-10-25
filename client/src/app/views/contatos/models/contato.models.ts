export interface ListarContatosViewModel {
  id: string;
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}
export interface InserirContatoViewModel {
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}
export interface ContatoInseridoViewModel {
  id: string;
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}
export interface EditarContatoViewModel {
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}
export interface ContatoEditadoViewModel {
  id: string;
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}
export interface DetalhesContatoViewModel {
  id: string;
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  telefone: string;
}

export interface ContatoExcluidoViewModel {}
