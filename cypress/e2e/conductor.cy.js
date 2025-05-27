describe('Conductor - Página Sacar Ticket', () => {
    beforeEach(() => {
      cy.visit('http://localhost:1234/conductor.html');
    });
  
    it('Debería cargar la página y mostrar botón SACAR TICKET', () => {

      cy.get('#btn-get-ticket').should('exist').and('be.visible');
      cy.get('#select-station').should('exist').and('be.visible');
      cy.get('#input-amount').should('exist').and('be.visible');
    });
  
    it('Debería mostrar error si intento sacar ticket sin llenar datos', () => {
      cy.get('#btn-get-ticket').click();
      cy.get('.error-message').should('exist').and('contain', 'Faltan datos');
    });
  

  });
  