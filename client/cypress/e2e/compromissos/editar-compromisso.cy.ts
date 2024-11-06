import { CompromissosPageObject } from './util/compromissos.page-object';

describe('Ao navegar para o Cadastro de Contato', () => {
  const pageObjectCompromisso = new CompromissosPageObject();

  beforeEach(() => {
    cy.registrar();
    cy.wait(500);
    pageObjectCompromisso.inserirContato()
    pageObjectCompromisso.navegarParaCadastroCompromisso();
  });

  it('Deve editar o compromisso corretamente', () => {
    pageObjectCompromisso.inserirCompromisso({ link: 'www.google.com' });
    cy.wait(500);
    cy.url().should('contain', '/compromissos/listar');

    cy.get('[data-cy-list-item]')
      .first()
      .within(() => {
        cy.get('[data-cy=editar]').click();
      });

    cy.url().should('contain', '/compromissos/editar');

    pageObjectCompromisso.editarCompromisso();
    cy.contains("O compromisso 'Teste de Compromisso Editado' foi editado com sucesso!");

    cy.get('[data-cy-list-item').should('have.length', 1);

    cy.get('mat-card-title').should('contain', 'Teste de Compromisso Editado');
    cy.get('mat-card-content').should('contain', 'Início: 10:00');
    cy.get('mat-card-content').should('contain', 'Fim: 18:00');
  });
});
