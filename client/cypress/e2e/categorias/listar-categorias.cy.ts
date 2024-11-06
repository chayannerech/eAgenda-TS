describe('Ao acessar a listagem de categorias', () => {
  beforeEach(() => {
    cy.registrar();
    cy.url().should('contain', 'dashboard');
    cy.visit('categorias');
  });

  it('Deve carregar a listagem corretamente', () => {
    cy.contains('h1', 'Categorias');
    cy.url().should('contain', '/categorias/listar');

    cy.get('[data-cy-list-item]').should('have.length', 0);
  });
});
