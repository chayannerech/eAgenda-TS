import { ContatosPageObject } from './util/contatos.page-object';

describe('Ao navegar para o Cadastro de Contato', () => {
  const pageObject = new ContatosPageObject();

  beforeEach(() => {
    cy.limparDados();

    cy.registrar();

    cy.wait(2000);

    cy.url().should('contain', '/dashboard');

    cy.visit('contatos');

    cy.contains('h1', 'Listagem de Contatos');
  });

  it('Deve cadastrar o contato corretamente', () => {
    cy.get('[data-cy-list-item]').should('have.length', 0);

    cy.get('[data-cy=novoRegistro]').click();

    cy.get('[data-cy=nome]').type('Teste do Cypress');
    cy.get('[data-cy=email]').type('testador@cypress.com');
    cy.get('[data-cy=telefone]').type('49 99999-0000');
    cy.get('[data-cy=empresa]').type('Cypress');
    cy.get('[data-cy=cargo]').type('Testador');

    cy.get('button[type=submit]').click();

    cy.contains('Contato "Teste do Cypress" cadastrado com sucesso!');

    cy.get('[data-cy-list-item').should('have.length', 1);
  });

  it('Deve exibir erro ao tentar cadastrar sem preencher o nome', () => {
    pageObject.inserirContato({ nome: '' });

    cy.get('mat-error').should('have.text', 'O nome precisa ser preenchido.');
  });

  it('Deve exibir erro ao tentar cadastrar com nome curto', () => {
    pageObject.inserirContato({ nome: 'Jo' });

    cy.get('mat-error').contains('O nome deve conter ao menos 3 caracteres.');
  });

  it('Deve exibir erro ao tentar cadastrar sem preencher o email', () => {
    pageObject.inserirContato({ email: '' });

    cy.get('mat-error').contains('O email precisa ser preenchido.');
  });

  it('Deve exibir erro ao tentar cadastrar com email inválido', () => {
    pageObject.inserirContato({ email: 'emailinvalido' });

    cy.get('mat-error').contains(
      'O valor informado não segue um padrão de email.'
    );
  });

  it('Deve exibir erro ao tentar cadastrar sem preencher o telefone', () => {
    pageObject.inserirContato({ telefone: '' });

    cy.get('mat-error').contains('O telefone precisa ser preenchido.');
  });

  it('Deve exibir erro ao tentar cadastrar sem preencher a empresa', () => {
    pageObject.inserirContato({ empresa: '' });

    cy.get('mat-error').contains('A empresa precisa ser preenchida.');
  });

  it('Deve exibir erro ao tentar cadastrar com empresa curta', () => {
    pageObject.inserirContato({ empresa: 'AB' });

    cy.get('mat-error').contains(
      'A empresa deve conter ao menos 3 caracteres.'
    );
  });

  it('Deve exibir erro ao tentar cadastrar sem preencher o cargo', () => {
    pageObject.inserirContato({ cargo: '' });

    cy.get('mat-error').contains('O cargo precisa ser preenchido.');
  });

  it('Deve exibir erro ao tentar cadastrar com cargo curto', () => {
    pageObject.inserirContato({ cargo: 'AB' });

    cy.get('mat-error').contains('O cargo deve conter ao menos 3 caracteres.');
  });
});
