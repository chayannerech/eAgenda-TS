export interface ListarCompromissosViewModel {
  id: string;
  assunto: string;
  data: string;
  horaInicio: string;
  horaTermino: string;
}
export interface InserirCompromissoViewModel {
  assunto: string;
  local: string;
  tipoLocal: number;
  link: string;
  data: string;
  horaInicio: string;
  horaTermino: string;
  contatoId: string
}
export interface CompromissoInseridoViewModel {
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
export interface EditarCompromissoViewModel {
  assunto: string;
  local: string;
  tipoLocal: number;
  link: string;
  data: string;
  horaInicio: string;
  horaTermino: string;
  contatoid: string
}
export interface CompromissoEditadoViewModel {
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
export interface DetalhesCompromissoViewModel {
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

export interface CompromissoExcluidoViewModel {}
