describe('Ao acessar a página de Listagem de Contatos', () => {
  beforeEach(() => {
    cy.registrar();
    cy.url().should('contain', 'dashboard');
    cy.visit('contatos');
  });

  it('Deve carregar a listagem corretamente', () => {
    cy.contains('h1', 'Contatos');
    cy.url().should('contain', '/contatos/listar');

    cy.get('[data-cy-list-item]').should('have.length', 0);
  });
});
