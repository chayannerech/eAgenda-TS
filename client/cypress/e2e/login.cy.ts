
describe('Processo de Login do Usuário', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('Deve redirecionar para o login', () => {
    cy.visit('/')
    cy.contains('Login de Usuário')
  });

  it('Deve autenticar o usuário corretamente e redirecionar para o dashboard', () => {
    cy.get('[data-cy=login]').type('pedrinho');
    cy.get('[data-cy=senha]').type('Che!698319');
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);

    cy.contains('Painel de Controle');
    cy.url().should('contains', '/dashboard');
  })

  it('Deve mostrar erro de login não informado', () => {
    cy.get('[data-cy=senha]').type('Che!69831');
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);

    cy.contains('O login precisa ser preenchido');
  })

  it('Deve mostrar erro de senha não informada', () => {
    cy.get('[data-cy=login]').type('pedrinho');
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);

    cy.contains('A senha precisa ser preenchida');
  })

  it('Deve mostrar erro ao inserir login inválido', () => {
    cy.get('[data-cy=login]').type('pedrinh');
    cy.get('[data-cy=senha]').type('Che!698319');
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);

    cy.contains('Login ou senha incorretos');
  })

  it('Deve mostrar erro ao inserir senha inválida', () => {
    cy.get('[data-cy=login]').type('pedrinho');
    cy.get('[data-cy=senha]').type('Che!69831');
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
