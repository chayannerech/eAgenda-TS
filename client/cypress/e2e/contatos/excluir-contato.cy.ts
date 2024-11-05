import { ContatosPageObject } from './util/contatos.page-object';

describe('Ao navegar para a Exclusão de Contato', () => {
  const pageObject = new ContatosPageObject();

  beforeEach(() => {
    cy.registrar();
    cy.wait(500);
    cy.visit('contatos');
    cy.get('[data-cy=cadastrar]').click();
    cy.wait(500);
    pageObject.inserirContato();
    cy.wait(500);
    cy.url().should('contain', '/contatos/listar');

    cy.get('[data-cy-list-item]')
      .first()
      .within(() => {
        cy.get('[data-cy=excluir]').click();
      });
    cy.url().should('contain', '/contatos/excluir');
  });

  it('Deve exibir os detalhes corretos do contato a ser excluido', () => {
    cy.contains('Teste de Contato');
    cy.contains('p', 'Id:');
    cy.contains('p', 'Empresa:');
    cy.contains('p', 'Cypress');

    cy.contains('p', 'Cargo:');
    cy.contains('p', 'Testador');

    cy.contains('p', 'Email:');
    cy.contains('p', 'testeContato@dominio.com');

    cy.contains('p', 'Telefone:');
    cy.contains('p', '(49) 99999-0000');
  });

  it('Deve excluir o contato corretamente', () => {
    cy.get('button').contains('Excluir').click();
    cy.contains("O contato 'Teste de Contato' foi excluído com sucesso!");
    cy.get('[data-cy-list-item]').should('have.length', 0);
  });
});
