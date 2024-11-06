export class CategoriasPageObject {
  get titulo() { return cy.get('[title=título]'); }

  public inserirCategoria({ titulo = 'Teste de Categoria' } = {}) {
    if (titulo) this.titulo.type(titulo);
    cy.get('button[type=submit').click();
  }

  public editarCategoria({ titulo = ' Editada' } = {}) {
    if (titulo) this.titulo.type(titulo);
    cy.get('button[type=submit').click();
  }
}
