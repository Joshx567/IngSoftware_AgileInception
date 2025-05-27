    describe('Sacar Ticket - Cero Cola', () => {
    beforeEach(() => {
        cy.visit('http://localhost:1234/paginas/conductor.html'); // Ajusta si es otro archivo o ruta
    });

    it('Debería permitir sacar un ticket si todos los datos son válidos', () => {
        // Suponemos que los <select> ya están cargados dinámicamente, así que se simula con opciones ficticias
        cy.get('#select-station').select('Estación Norte'); // Ajusta según opciones reales
        cy.get('#select-fuel-ticket').select('diesel'); // Ajusta según opciones reales

        cy.get('#input-amount').clear().type('12');
        cy.get('#input-license-plate').type('123ABC');
        cy.get('#input-id-card').type('77896516');

        cy.get('#btn-get-ticket').click();

        // Suponiendo que haya un contenedor donde se muestra el resultado (agrega tu selector real)
        cy.get('#my-latest-ticket')
        .should('be.visible')
        .and('not.be.empty');
    });

    it('No debería permitir sacar un ticket si falta la placa', () => {
        cy.get('#select-station').select('Estación Norte');
        cy.get('#select-fuel-ticket').select('diesel');
        cy.get('#input-amount').clear().type('30');
        cy.get('#input-id-card').type('77896516');

        cy.get('#btn-get-ticket').click();

        cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Por favor completa todos los campos.');
        });
    });
    });
