describe('Formulario para generar ticket', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Debería generar un ticket si todo es válido', () => {
    cy.get('#select-nombre-estacion-ticket').select('Estación Sur');

    cy.get('#ticket-tipo-combustible').select('gnv');

    cy.get('#ticket-cantidad').clear().type('10');

    cy.get('#hora-ticket').clear().type('10:00');

    cy.get('#usuario-operario-t').clear().type('Carlos');

    cy.get('#generar-ticket-form').submit();

    cy.get('#resultado-ticket')
      .should('be.visible')
      .and('contain.text', 'Ticket generado');
  });

  it('Debería mostrar error si se ingresa cantidad 0', () => {
    cy.get('#select-nombre-estacion-ticket').select('Estación Sur');
    cy.get('#ticket-tipo-combustible').select('gnv');
    cy.get('#ticket-cantidad').clear().type('0');
    cy.get('#hora-ticket').clear().type('10:00');
    cy.get('#usuario-operario-t').clear().type('Carlos');
    cy.get('#generar-ticket-form').submit();

    cy.get('#resultado-ticket')
      .should('be.visible')
      .and('contain.text', 'Cantidad ingresada invalida'); 
  });
});
