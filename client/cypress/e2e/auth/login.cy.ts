describe('Processo de Login do Usuário', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('Deve redirecionar para o login', () => {
    cy.contains('Login de Usuário')
  });

  it('Deve autenticar o usuário corretamente e redirecionar para o dashboard', () => {
    cy.registrar();
    cy.logout();
    cy.visit('/')

    cy.get('[data-cy=login]').type('TesteLogin');
    cy.get('[data-cy=senha]').type('Teste@123');
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);

    cy.contains('Painel de Controle');
    cy.url().should('contains', '/dashboard');
  })

  it('Deve mostrar erro de campos vazios', () => {
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);

    cy.contains('O login precisa ser preenchido');
    cy.contains('A senha precisa ser preenchida');
  })

  it('Deve mostrar erro ao inserir login inválido', () => {
    cy.get('[data-cy=login]').type('testeLog');
    cy.get('[data-cy=senha]').type('Abc!123');
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);

    cy.contains('Login ou senha incorretos');
  })

  it('Deve mostrar erro ao inserir senha inválida', () => {
    cy.get('[data-cy=login]').type('testeLogin');
    cy.get('[data-cy=senha]').type('Abc!12');
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);

    cy.contains('Login ou senha incorretos');
  })

  it('Deve redirecionar à pagina de registro de usuário', () => {
    cy.get('[data-cy=registrar]').click();
    cy.wait(1000);

    cy.contains('Registro de Usuário');
    cy.url().should('contains', '/registro');
  })
})
