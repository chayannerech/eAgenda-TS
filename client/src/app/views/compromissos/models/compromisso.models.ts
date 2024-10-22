export interface ListarContatos {
  id: number;
  assunto: string;
  data: string;
  horaInicio: string;
  horaTermino: string;
}
export interface InserirContato {
  assunto: string;
  local: string;
  tipoLocal: 0;
  link: string;
  data: string;
  horaInicio: string;
  horaTermino: string;
  contatoId: number
}
export interface ContatoInserido {
  id: number;
  assunto: string;
  local: string;
  tipoLocal: 0;
  link: string;
  data: string;
  horaInicio: string;
  horaTermino: string;
  contatoId: number
}
export interface EditarContato {
  assunto: string;
  local: string;
  tipoLocal: 0;
  link: string;
  data: string;
  horaInicio: string;
  horaTermino: string;
  contatoId: number
}
export interface ContatoEditado {
  id: number;
  assunto: string;
  local: string;
  tipoLocal: 0;
  link: string;
  data: string;
  horaInicio: string;
  horaTermino: string;
  contatoId: number
}
export interface DetalhesContato {
  id: number;
  assunto: string;
  local: string;
  tipoLocal: 0;
  link: string;
  data: string;
  horaInicio: string;
  horaTermino: string;
  contato: ContatoEmCompromissoViewModel
}
export interface ContatoEmCompromissoViewModel {
  id: number;
  nome: string;
  empresa: string;
  cargo: string;
  telefone: string;
}

export interface ContatoExcluido {}
