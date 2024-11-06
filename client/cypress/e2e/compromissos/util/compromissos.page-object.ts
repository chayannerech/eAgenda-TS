import { ContatosPageObject } from "../../contatos/util/contatos.page-object";

const pageObjectContato = new ContatosPageObject();

export class CompromissosPageObject {
  get assunto() { return cy.get('[title=assunto]'); }
  get link() { return cy.get('[data-cy=link]'); }
  get local() { return cy.get('[data-cy=local]'); }
  get data() { return cy.get('[data-cy=data]'); }
  get inicio() { return cy.get('[title=início]'); }
  get termino() { return cy.get('[title=término]'); }
  get abrirSeletor() { return cy.get('[data-cy=abrirSeletor]'); }

  public inserirContato() {
    cy.visit('contatos');
    cy.get('[data-cy=cadastrar]').click();
    cy.wait(500);
    pageObjectContato.inserirContato();
    cy.wait(500);
  }

  public navegarParaCadastroCompromisso() {
    cy.visit('compromissos');
    cy.get('[data-cy=cadastrar]').click();
    cy.wait(500);
    cy.contains('Cadastrar compromisso');
  }

  public inserirCompromisso({
    assunto = 'Teste de Compromisso',
    link = '',
    local = '',
    data = '12/12/2024',
    inicio = '09:30',
    termino = '10:30'
  } = {}) {
    if (assunto) this.assunto.type(assunto);
    if (link) this.link.type(link);
    if (local) this.local.type(local);
    if (data) this.data.type(data);
    if (inicio) this.inicio.type(inicio);
    if (termino) this.termino.type(termino);

    this.abrirSeletor.click();
    cy.get('mat-option[title="Teste de Contato"]').click();
    cy.get('button[type=submit').click();
  }

  public editarCompromisso({
    assunto = ' Editado',
    inicio = '10:00',
    termino = '18:00'
  } = {}) {
    if (assunto) this.assunto.type(assunto);
    this.inicio.clear();
    if (inicio) this.inicio.type(inicio);
    this.termino.clear();
    if (termino) this.termino.type(termino);

    this.abrirSeletor.click();
    cy.get('mat-option[title="Teste de Contato"]').click();
    cy.get('button[type=submit').click();
  }
}
