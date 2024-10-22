export interface ListarCompromissos {
  id: number;
  assunto: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
}
export interface InserirCompromisso {
  assunto: string;
  local: string;
  tipoLocal: 0;
  link: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  contatoId: number
}
export interface CompromissoInserido {
  id: number;
  assunto: string;
  local: string;
  tipoLocal: 0;
  link: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  contatoId: number
}
export interface EditarCompromisso {
  assunto: string;
  local: string;
  tipoLocal: 0;
  link: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  contatoId: number
}
export interface CompromissoEditado {
  id: number;
  assunto: string;
  local: string;
  tipoLocal: 0;
  link: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  contatoId: number
}
export interface DetalhesCompromisso {
  id: number;
  assunto: string;
  local: string;
  tipoLocal: 0;
  link: string;
  data: Date;
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

export interface CompromissoExcluido {}
