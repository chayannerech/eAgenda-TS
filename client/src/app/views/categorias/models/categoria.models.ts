import { ListarDespesasViewModel } from "../../despesas/models/despesa.models";

export interface ListarCategoriasViewModel {
  id: string;
  titulo: string;
}
export interface InserirCategoriaViewModel {
  titulo: string;
}
export interface CategoriaInseridaViewModel {
  id: string;
  titulo: string;
}
export interface EditarCategoriaViewModel {
  titulo: string;
}
export interface CategoriaEditadaViewModel {
  id: string;
  titulo: string;
  despesas: ListarDespesasViewModel[];
}
export interface DetalhesCategoriaViewModel {
  id: string;
  titulo: string;
  despesas: ListarDespesasViewModel[];
}

export interface CategoriaExcluidaViewModel {}
