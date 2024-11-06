import { CompromissosPageObject } from './util/compromissos.page-object';

describe('Ao navegar para o Cadastro de Compromisso', () => {
  const pageObjectCompromisso = new CompromissosPageObject();

  beforeEach(() => {
    cy.registrar();
    cy.wait(500);
    pageObjectCompromisso.inserirContato()
    pageObjectCompromisso.navegarParaCadastroCompromisso();
  });

  it('Deve cadastrar compromisso remoto corretamente', () => {
    pageObjectCompromisso.inserirCompromisso({ link: 'www.google.com' });
    cy.contains("O compromisso 'Teste de Compromisso' foi cadastrado com sucesso!");
    cy.get('[data-cy-list-item').should('have.length', 1);
  });

  it('Deve cadastrar compromisso presencial corretamente', () => {
    cy.get('[data-cy=radios] mat-radio-button').contains('Presencial').click();

    pageObjectCompromisso.inserirCompromisso({ local: 'Casa'});
    cy.contains("O compromisso 'Teste de Compromisso' foi cadastrado com sucesso!");
    cy.get('[data-cy-list-item').should('have.length', 1);
  });

  it('Deve exibir erro campos vazios em compromisso remoto', () => {
    cy.get('button[type=submit]').click();
    cy.contains("O assunto é obrigatório!");
    cy.contains("O link é obrigatório!");
    cy.contains("A data é obrigatória!");
    cy.contains("A hora de início é obrigatória!");
    cy.contains("A hora de término é obrigatória!");
    cy.contains("O contato é obrigatório!");
  });

  it('Deve exibir erro campos vazios em compromisso presencial', () => {
    cy.get('[data-cy=radios] mat-radio-button').contains('Presencial').click();

    cy.get('button[type=submit]').click();
    cy.contains("O assunto é obrigatório!");
    cy.contains("O local é obrigatório!");
    cy.contains("A data é obrigatória!");
    cy.contains("A hora de início é obrigatória!");
    cy.contains("A hora de término é obrigatória!");
    cy.contains("O contato é obrigatório!");
  });

  it('Deve exibir erro assunto menor que o mínimo', () => {
    pageObjectCompromisso.inserirCompromisso({ assunto: 'oi', link: 'www.google.com' });

    cy.get('mat-error').contains('O assunto precisa conter ao menos 3 caracteres!');
  });

  it('Deve exibir erro link inválido', () => {
    pageObjectCompromisso.inserirCompromisso({ link: 'inválido' });

    cy.contains("'Link' não está no formato correto.");
  });

  it('Deve exibir erro local menor que o mínimo', () => {
    cy.get('[data-cy=radios] mat-radio-button').contains('Presencial').click();

    pageObjectCompromisso.inserirCompromisso({ local: 'aa' });

    cy.get('mat-error').contains('O local precisa conter ao menos 3 caracteres!');
  });

  it('Deve exibir erro data inválida', () => {
    pageObjectCompromisso.inserirCompromisso({ link: 'www.google.com', data: '111' });

    cy.contains("'Data' deve ser superior ou igual a '06/11/2024 00:00:00'.");
  });

  it('Deve exibir erro hora início inválida', () => {
    pageObjectCompromisso.inserirCompromisso({ link: 'www.google.com', inicio: '111' });

    cy.get('mat-error').contains("Informe uma hora no formato HH:mm!");
  });

  it('Deve exibir erro hora término inválida', () => {
    pageObjectCompromisso.inserirCompromisso({ link: 'www.google.com', termino: '111' });

    cy.get('mat-error').contains("Informe uma hora no formato HH:mm!");
  });
});
