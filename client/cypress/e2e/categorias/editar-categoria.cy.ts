import { CategoriasPageObject } from './util/categorias.page-object';

describe('Ao editar uma categoria', () => {
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
        cy.get('[data-cy=editar]').click();
      });

    cy.url().should('contain', '/categorias/editar');
  });

  it('Deve editar a categoria corretamente', () => {
    pageObject.editarCategoria();
    cy.contains("A categoria 'Teste de Categoria Editada' foi editada com sucesso!");

    cy.get('[data-cy-list-item').should('have.length', 1);

    cy.get('mat-card-title').should('contain', 'Teste de Categoria Editada');
  });
});
