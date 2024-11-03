export class ContatosPageObject {
  get nome() {
    return cy.get('[data-cy=nome]');
  }

  get email() {
    return cy.get('[data-cy=email]');
  }

  get telefone() {
    return cy.get('[data-cy=telefone]');
  }

  get empresa() {
    return cy.get('[data-cy=empresa]');
  }

  get cargo() {
    return cy.get('[data-cy=cargo]');
  }

  public inserirContato({
    nome = 'Teste do Cypress',
    email = 'testador@cypress.com',
    telefone = '49 99999-0000',
    empresa = 'Cypress',
    cargo = 'Testador',
  } = {}) {
    cy.get('[data-cy=novoRegistro]').click();

    if (nome) this.nome.type(nome);
    if (email) this.email.type(email);
    if (telefone) this.telefone.type(telefone);
    if (empresa) this.empresa.type(empresa);
    if (cargo) this.cargo.type(cargo);

    cy.get('button[type=submit').click();
  }
}
