export interface ListarCompromissosViewModel {
  id: string;
  assunto: string;
  data: string;
  horaInicio: string;
  horaTermino: string;
}
export interface InserirCompromisso {
  assunto: string;
  local: string;
  tipoLocal: number;
  link: string;
  data: string;
  horaInicio: string;
  horaTermino: string;
  contatoId: string
}
export interface CompromissoInserido {
  id: string;
  assunto: string;
  local: string;
  tipoLocal: number;
  link: string;
  data: string;
  horaInicio: string;
  horaTermino: string;
  contatoid: string
}
export interface EditarCompromisso {
  assunto: string;
  local: string;
  tipoLocal: number;
  link: string;
  data: string;
  horaInicio: string;
  horaTermino: string;
  contatoid: string
}
export interface CompromissoEditado {
  id: string;
  assunto: string;
  local: string;
  tipoLocal: number;
  link: string;
  data: string;
  horaInicio: string;
  horaTermino: string;
  contatoid: string
}
export interface DetalhesCompromisso {
  id: string;
  assunto: string;
  local: string;
  tipoLocal: number;
  link: string;
  data: string;
  horaInicio: string;
  horaTermino: string;
  contato: ContatoEmCompromissoViewModel
}
export interface ContatoEmCompromissoViewModel {
  id: string;
  nome: string;
  empresa: string;
  cargo: string;
  telefone: string;
}

export interface CompromissoExcluido {}
