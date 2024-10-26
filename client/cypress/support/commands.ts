declare namespace Cypress {
  interface Chainable<Subject = any> {
    limparDados(): typeof limparDados;
    registrar(
      nome?: string,
      login?: string,
      email?: string,
      senha?: string
    ): typeof registrar;
    logout(): typeof logout;
  }
}

function limparDados(): void {
  const url = Cypress.env('apiUrl') + '/db/limpar';

  fetch(url, { method: 'DELETE' }).then((resposta) => {
    if (resposta.status === 200) {
      console.log('Dados limpos no banco de dados');
    } else {
      throw new Error('Falha ao limpar dados: Status ' + resposta.status);
    }
  });
}

function registrar(
  nome: string = 'Teste do Cypress',
  login: string = 'Teste',
  email: string = 'teste@cypress.com',
  senha: string = 'Teste@123'
) {
  cy.visit('registro');

  cy.get('[data-cy=nome]').type(nome);
  cy.get('[data-cy=login]').type(login);
  cy.get('[data-cy=email]').type(email);
  cy.get('[data-cy=senha]').type(senha);

  cy.get('button[type=submit]').click();
}

function logout() {
  cy.get('[data-cy=logout]').click();
}

Cypress.Commands.add('limparDados', limparDados);
Cypress.Commands.add('registrar', registrar);
Cypress.Commands.add('logout', logout);
