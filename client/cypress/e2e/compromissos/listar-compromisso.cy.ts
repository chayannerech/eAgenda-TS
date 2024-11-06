describe('Ao acessar a listagem de compromissos', () => {
  beforeEach(() => {
    cy.registrar();
    cy.url().should('contain', 'dashboard');
    cy.visit('compromissos');
  });

  it('Deve carregar a listagem corretamente', () => {
    cy.contains('h1', 'Compromissos');
    cy.url().should('contain', '/compromissos/listar');

    cy.get('[data-cy-list-item]').should('have.length', 0);
  });
});
