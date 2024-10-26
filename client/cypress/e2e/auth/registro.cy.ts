describe('Processo de registro do usuário', () => {
  beforeEach(() => {
    cy.visit('/registro')
  });

  it('Deve redirecionar para a página de registro', () => {
    cy.contains('Registro de Usuário')
  });

  // it('Deve registrar o usuário corretamente e redirecionar para o dashboard', () => {
  //   cy.get('[data-cy=nome]').type('Teste de registro');
  //   cy.get('[data-cy=login]').type('testeRegistro');
  //   cy.get('[data-cy=email]').type('testeRegistro@dominio.com');
  //   cy.get('[data-cy=senha]').type('Che!698319');
  //   cy.get('[data-cy=submit]').click();
  //   cy.wait(1000);

  //   cy.contains('Painel de Controle');
  //   cy.url().should('contains', '/dashboard');
  // })

  it('Deve mostrar erro de campos vazios', () => {
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);

    cy.contains('O nome precisa ser preenchido');
    cy.contains('O nome de usuário precisa ser preenchido');
    cy.contains('O email precisa ser preenchido');
    cy.contains('A senha precisa ser preenchida');
  })

  it('Deve mostrar erro de tamanhos mínimo', () => {
    cy.get('[data-cy=nome]').type('Te');
    cy.get('[data-cy=login]').type('te');
    cy.get('[data-cy=senha]').type('Ab!1');
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);

    cy.contains('O nome deve conter ao menos 3 caracteres');
    cy.contains('O nome de usuário deve conter ao menos 3 caracteres');
    cy.contains('A senha deve conter ao menos 6 caracteres');
  })

  it('Deve mostrar erro de formato do email', () => {
    cy.get('[data-cy=email]').type('emailErrado');
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);

    cy.contains('O email precisa seguir o formato "usuario@dominio.com"');
  })

  it('Deve mostrar erro de caracteres da senha', () => {
    cy.get('[data-cy=senha]').type('aaaaaa'); //falta 'A ! 1'
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);

    cy.contains('A senha deve conter ao menos uma letra maiúscula, um caractere especial e um número');

    cy.get('[data-cy=senha]').clear();
    cy.get('[data-cy=senha]').type('Aaaaaa'); //falta '! 1'
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);

    cy.contains('A senha deve conter ao menos uma letra maiúscula, um caractere especial e um número');

    cy.get('[data-cy=senha]').clear();
    cy.get('[data-cy=senha]').type('A!aaaa'); //falta '1'
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);

    cy.contains('A senha deve conter ao menos uma letra maiúscula, um caractere especial e um número');

    cy.get('[data-cy=senha]').clear();
    cy.get('[data-cy=senha]').type('A1aaaa'); //falta '!'
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);

    cy.contains('A senha deve conter ao menos uma letra maiúscula, um caractere especial e um número');
  })

  it('Deve mostrar erro de login repetido', () => {
    cy.get('[data-cy=nome]').type('Teste de registro');
    cy.get('[data-cy=login]').type('testeLogin');
    cy.get('[data-cy=email]').type('testeRegistro@dominio.com');
    cy.get('[data-cy=senha]').type('Abc!123');
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);

    cy.contains("Login 'testeLogin' já está sendo utilizado");
  })

  it('Deve mostrar erro de email repetido', () => {
    cy.get('[data-cy=nome]').type('Teste de registro');
    cy.get('[data-cy=login]').type('testeRegistro1');
    cy.get('[data-cy=email]').type('testeLogin@dominio.com');
    cy.get('[data-cy=senha]').type('Abc!123');
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);

    cy.contains("Email 'testeLogin@dominio.com' já está sendo utilizado");
  })

  it('Deve redirecionar à pagina de login de usuário', () => {
    cy.get('[data-cy=jaTemConta]').click();
    cy.wait(1000);

    cy.contains('Login de Usuário');
    cy.url().should('contains', '/login');
  })
})
