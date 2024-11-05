export class ContatosPageObject {
  get nome() { return cy.get('[title=nome]'); }
  get email() { return cy.get('[data-cy=email]'); }
  get empresa() { return cy.get('[title=empresa]'); }
  get cargo() { return cy.get('[title=cargo]'); }
  get telefone() { return cy.get('[data-cy=telefone]'); }


  public inserirContato({
    nome = 'Teste de contato',
    email = 'testeContato@dominio.com',
    empresa = 'Cypress',
    cargo = 'Testador',
    telefone = '49 99999-0000',
  } = {}) {
    if (nome) this.nome.type(nome);
    if (email) this.email.type(email);
    if (empresa) this.empresa.type(empresa);
    if (cargo) this.cargo.type(cargo);
    if (telefone) this.telefone.type(telefone);

    cy.get('button[type=submit').click();
  }
}
