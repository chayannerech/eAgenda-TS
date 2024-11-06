import { CompromissosPageObject } from './util/compromissos.page-object';

describe('Ao navegar para a Exclusão de Contato', () => {
  const pageObject = new CompromissosPageObject();

  beforeEach(() => {
    cy.registrar();
    cy.wait(500);
    pageObject.inserirContato()
    pageObject.navegarParaCadastroCompromisso();
    pageObject.inserirCompromisso({ link: 'www.google.com' })

    cy.get('[data-cy-list-item]')
      .first()
      .within(() => {
        cy.get('[data-cy=excluir]').click();
      });

    cy.url().should('contain', '/compromissos/excluir');
  });

  it('Deve exibir os detalhes corretos da categoria a ser excluida', () => {
    cy.contains('Teste de Compromisso');
    cy.contains('p', 'Id:');

    cy.contains('p', 'Link:');
    cy.contains('p', 'www.google.com');

    cy.contains('p', 'Data:');
    cy.contains('p', '12/12/2024');

    cy.contains('p', 'Início:');
    cy.contains('p', '09:30');

    cy.contains('p', 'Término:');
    cy.contains('p', '10:30');

    cy.contains('p', 'Contato:');
    cy.contains('p', 'Teste de Contato');
  });

  it('Deve excluir a categoria corretamente', () => {
    cy.get('button').contains('Excluir').click();
    cy.contains("O compromisso 'Teste de Compromisso' foi excluído com sucesso!");
    cy.get('[data-cy-list-item]').should('have.length', 0);
  });
});
