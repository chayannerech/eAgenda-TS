import { ContatosPageObject } from './util/contatos.page-object';

describe('Ao navegar para o Cadastro de Contato', () => {
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
        cy.get('[data-cy=editar]').click();
      });
    cy.url().should('contain', '/contatos/editar');
  });

  it('Deve editar o contato corretamente', () => {
    cy.get('[data-cy=email]').clear();
    cy.get('[data-cy=telefone]').clear();

    pageObject.inserirContato({
      nome: ' Editado',
      email: 'editado@dominio.com',
      empresa: ' Editado',
      cargo: ' Editado',
      telefone: '(49) 99999-1111',
      });
    cy.contains("O contato 'Teste de Contato Editado' foi editado com sucesso!");

    cy.get('[data-cy-list-item').should('have.length', 1);

    cy.get('mat-card-title').should('contain', 'Teste de Contato Editado');
    cy.get('mat-card-content').should('contain', '(49) 99999-1111');
    cy.get('mat-card-content').should('contain', 'Cypress Editado');
    cy.get('mat-card-content').should('contain', 'Testador Editado');
  });
});
