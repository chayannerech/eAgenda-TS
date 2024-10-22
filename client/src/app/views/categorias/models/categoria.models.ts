
export interface ListarCategorias {
  id: number;
  titulo: string;
}
export interface InserirCategoria {
  titulo: string;
}
export interface CategoriaInserida {
  id: number;
  titulo: string;
}
export interface EditarCategoria {
  titulo: string;
}
export interface CategoriaEditada {
  id: number;
  titulo: string;
}
export interface DetalhesCategoria {
  id: number;
  titulo: string;
}

export interface CategoriaExcluida {}
