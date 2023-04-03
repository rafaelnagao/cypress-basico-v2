/// <reference types="Cypress" />

const { delay } = require("lodash")

describe('Central de Atendimento ao Cliente TAT', function() {
  this.beforeEach(function() {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.visit('./src/index.html')

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche e envia o formulário', function() {
    const longText = 'ljaksdlkjfsdlkjafslj ljaslkjfdslkfdsa asljfakljsafasjkl asdlsdfjlksfaja lasjdfklsadjfjf alkfjdsjaklffffffljasldkfsajnbvaoiwejjsfksaklj;lkasjfd'
    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Nagao')
    cy.get('#email').type('rafanagao@qualquer.co')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('erro ao submeter com email em formatação inválida', function() {
    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Nagao')
    cy.get('#email').type('rafanagao@qualquer.coisa')
    cy.get('#open-text-area').type('Test test test')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('campo de telefone só aceita números', () => {
    cy.get('#phone')
      .type('abcdfghij')
      .should('have.value', '')
  })

  it('erro quando o telefone é obrigatório e não preenchido', () => {
    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Nagao')
    cy.get('#email').type('rafanagao@qualquer.coisa')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Test test test')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('limpa um campo', () => {
    cy.get('#firstName')
      .type('blablabla')
      .should('have.value', 'blablabla')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('blablabla')
      .should('have.value', 'blablabla')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('blablabla')
      .should('have.value', 'blablabla')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('13245345')
      .should('have.value', '13245345')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area')
      .type('blablabla')
      .should('have.value', 'blablabla')
      .clear()
      .should('have.value', '')
  })

  it('mensagem de erro ao submeter o formulário', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('envia com sucesso usando comando customizado', () => {
    cy.fillAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('identificar elementos', () => {
    cy.contains('button', 'Enviar')
  })

  it('campos de seleção suspensa', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona outro produto', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona produto Blog', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca atendimento Feedback', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  it('marca cada atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio) => {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca e desmarca ambos', () => {
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
  })

  it('upload de arquivo', () => {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('simular drag&drop', () => {
    cy.get('input[type="file"]#file-upload')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
    .should((input) => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('utilizar fixture com alias', () => {
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]#file-upload')
        .selectFile('@sampleFile')
        .should((input) => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
  })

  it('verifica que política de privacidade abre em outra aba', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('acessa e remove o target', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing').should('be.visible')
  })
  
  
})