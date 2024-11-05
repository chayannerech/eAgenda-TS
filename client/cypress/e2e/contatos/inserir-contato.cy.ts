import { ContatosPageObject } from './util/contatos.page-object';

describe('Ao navegar para o Cadastro de Contato', () => {
  const pageObject = new ContatosPageObject();

  beforeEach(() => {
    cy.registrar();
    cy.wait(500);
    cy.visit('contatos');
    cy.get('[data-cy=cadastrar]').click();
    cy.wait(500);
    cy.contains('Cadastrar contato');
  });

  it('Deve cadastrar o contato corretamente', () => {
    pageObject.inserirContato();
    cy.contains("O contato 'Teste de Contato' foi cadastrado com sucesso!");
    cy.get('[data-cy-list-item').should('have.length', 1);
  });

  it('Deve exibir erro campos vazios', () => {
    cy.get('button[type=submit]').click();

    cy.contains("O nome é obrigatório!");
    cy.contains("O email é obrigatório!");
    cy.contains("A empresa é obrigatória!");
    cy.contains("O cargo é obrigatório!");
    cy.contains("O telefone é obrigatório!");
  });

  it('Deve exibir erro nome menor que o mínimo', () => {
    pageObject.inserirContato({ nome: 'Jo' });
    cy.get('mat-error').contains('O nome precisa conter ao menos 3 caracteres!');
  });

  it('Deve exibir erro email inválido', () => {
    pageObject.inserirContato({ email: 'emailinvalido' });
    cy.get('mat-error').contains('O email precisa seguir o formato "usuario@dominio.com"');
  });

  it('Deve exibir erro empresa menor que o mínimo', () => {
    pageObject.inserirContato({ empresa: 'AB' });
    cy.get('mat-error').contains('A empresa precisa conter ao menos 3 caracteres!');
  });

  it('Deve exibir erro cargo menor que o mínimo', () => {
    pageObject.inserirContato({ cargo: 'AB' });
    cy.get('mat-error').contains('O cargo precisa conter ao menos 3 caracteres!');
  });

  it('Deve exibir erro telefone no formato incorreto', () => {
    pageObject.inserirContato({ telefone: '22222' });
    cy.contains("'Telefone' não está no formato correto.");
  });
});
