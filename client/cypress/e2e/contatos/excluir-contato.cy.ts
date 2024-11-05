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
  });

  it('Deve exibir os detalhes corretos do contato a ser excluido', () => {
    cy.get('[data-cy-list-item]')
      .first()
      .within(() => {
        cy.get('[data-cy=excluir]').click();
      });

    cy.url().should('contain', '/contatos/excluir');

    cy.get('mat-card-title').should('contain', 'Teste do Cypress');
    cy.get('mat-card-content').should('contain', 'testador@cypress.com');
    cy.get('mat-card-content').should('contain', '49 99999-0000');
    cy.get('mat-card-content').should('contain', 'Cypress');
    cy.get('mat-card-content').should('contain', 'Testador');
  });

  it('Deve excluir o contato corretamente', () => {
    cy.get('[data-cy-list-item]')
      .first()
      .within(() => {
        cy.get('[data-cy=botaoExcluir]').click();
      });

    cy.url().should('contain', '/contatos/excluir');

    cy.get('button').contains('Confirmar').click();

    cy.contains('Contato excluído com sucesso!');

    cy.get('[data-cy-list-item]').should('have.length', 0);
  });
});
