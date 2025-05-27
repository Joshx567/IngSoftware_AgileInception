describe('Formulario para generar ticket', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234/paginas/operario.html');

    // Forzar mostrar la sección oculta
    cy.document().then((doc) => {
      const seccion = doc.getElementById('section-generar-ticket');
      if (seccion) {
        seccion.style.display = 'block';
      } else {
        throw new Error('No se encontró la sección #section-generar-ticket');
      }
    });
  });

  it('Debería generar un ticket si todo es válido', () => {
    cy.get('#select-nombre-estacion-ticket').select('Estación 1', { force: true });
    cy.get('#input-cantidad-ticket').type('2', { force: true });
    cy.get('#input-hora-ticket').type('10:00', { force: true });
    cy.get('#btn-generar-ticket').click({ force: true });

    cy.get('#mensaje-generado-ticket').should('contain', 'Ticket generado');
  });
});
