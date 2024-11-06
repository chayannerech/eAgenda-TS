import { CategoriasPageObject } from './util/categorias.page-object';

describe('Ao excluir uma categoria', () => {
  const pageObject = new CategoriasPageObject();

  beforeEach(() => {
    cy.registrar();
    cy.wait(500);
    cy.visit('categorias');
    cy.get('[data-cy=cadastrar]').click();
    cy.wait(500);

    pageObject.inserirCategoria();
    cy.wait(500);
    cy.url().should('contain', '/categorias/listar');

    cy.get('[data-cy-list-item]')
      .first()
      .within(() => {
        cy.get('[data-cy=excluir]').click();
      });

    cy.url().should('contain', '/categorias/excluir');
  });

  it('Deve exibir os detalhes corretos da categoria a ser excluida', () => {
    cy.contains('Teste de Categoria');
    cy.contains('p', 'Id:');
  });

  it('Deve excluir a categoria corretamente', () => {
    cy.get('button').contains('Excluir').click();
    cy.contains("A categoria 'Teste de Categoria' foi excluída com sucesso!");
    cy.get('[data-cy-list-item]').should('have.length', 0);
  });
});
