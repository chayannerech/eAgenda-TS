# eAgenda

[![Stack](https://skillicons.dev/icons?i=dotnet,cs,postman,nodejs,typescript,angular,cypress&perline=8)](https://skillicons.dev)

## Projeto

Desenvolvido durante o curso Full-Stack da [Academia do Programador](https://www.academiadoprogramador.net) 2024

---
## Descrição

José Pedro gosta de participar em eventos, palestras e congressos de tecnologia. E depois de horas de networking é normal ele voltar para casa com vários cartões com contatos de seus novos colegas. É bastante comum ele deixar estes cartões guardados, que podem ser esquecidos no fundo de uma gaveta...

Para isto, será necessário fazer uma gestão de contatos inteligente e JP pretende fazer isso utilizando um sistema.

---
## Funcionalidades

1. O cadastro do **Contato** consiste de:
	- nome
	- email
	- telefone
	- cargo
	- empresa

2. O cadastro do **Compromisso** consiste de:
	- assunto
	- data
	- hora de início
	- hora de término
	- local (caso presencial)
	- link (caso remoto)
	- contato (opcional)

3. O cadastro do **Tarefa** consiste de:
	- título
	- prioridade
	- data de criação
	- data de conclusão
	- itens
	- percentual concluído

	3.1. **Item da Tarefa**
	- título
	- concluído (status)
	- tarefa

4. O cadastro do **Categoria** consiste de:
	- título
	- despesas

	4.1. Deverá ser possível visualizar todas as **despesas pertencentes a uma categoria**

5. O cadastro de **Despesa** consiste de:
	- descrição
	- valor
	- forma de pagamento
	- categorias (várias)

---
## Entregáveis:

1. **Aplicação Angular** com as implementações das funcionalidades principais listadas acima, com a possibilidade de **listar**, **cadastrar**, **editar** e **excluir** em todas elas.
2. **Autenticação e Autorização** implementadas em todos os módulos de funcionalidade.
3. **Testes e2e** com Cypress para as funcionalidades de CRUD dos módulos de funcionalidade e autenticação.

---
## Requisitos para Execução

- .NET SDK (recomendado .NET 8.0 ou superior) para compilação e execução do projeto back-end.
- Node.js v20+
- Angular v18 

---
## Executando o Back-End 

Vá para a pasta do projeto da WebAPI:

```bash
cd server/eAgenda.WebApi
```

Execute o projeto:

```bash
dotnet run
```

A API poderá ser acessada no endereço `https://localhost:4300/api`.

A documentação **OpenAPI** também estará disponível em: `https://localhost:4300/swagger`.

---
## Executando o Front-End 

Vá para a pasta do projeto Angular:

```bash
cd client
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm start
```

A aplicação está disponível no endereço `http://localhost:4200`.