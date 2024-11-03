describe('Ao acessar a página de Listagem de Contatos', () => {
  beforeEach(() => {
    cy.limparDados();

    cy.registrar();

    cy.wait(2000);

    cy.url().should('contain', 'dashboard');

    cy.visit('contatos');
  });

  it('Deve carregar a listagem corretamente', () => {
    cy.contains('h1', 'Listagem de Contatos');

    cy.url().should('contain', '/contatos/listar');
  });
});
