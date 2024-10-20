export interface RegistrarUsuarioViewModel {
  nome: string,
  login: string,
  email: string,
  senha: string
}
export interface TokenViewModel {
  chave: string,
  dataExpiracao: Date,
  usuario: UsuarioTokenViewModel,
}
export interface UsuarioTokenViewModel {
  id: string,
  nome: string,
  email: string
}
