import { CategoriasPageObject } from './util/categorias.page-object';

describe('Ao cadastrar categoria', () => {
  const pageObject = new CategoriasPageObject();

  beforeEach(() => {
    cy.registrar();
    cy.wait(500);
    cy.visit('categorias');
    cy.get('[data-cy=cadastrar]').click();
    cy.wait(500);
    cy.contains('Cadastrar categoria');
  });

  it('Deve cadastrar a categoria corretamente', () => {
    pageObject.inserirCategoria();
    cy.contains("A categoria 'Teste de Categoria' foi cadastrada com sucesso!");
    cy.get('[data-cy-list-item').should('have.length', 1);
  });

  it('Deve exibir erro campo vazio', () => {
    cy.get('button[type=submit]').click();
    cy.contains("O título é obrigatório!");
  });

  it('Deve exibir erro título menor que o mínimo', () => {
    pageObject.inserirCategoria({ titulo: 'Te' });
    cy.get('mat-error').contains('O título precisa conter ao menos 3 caracteres!');
  });
});
