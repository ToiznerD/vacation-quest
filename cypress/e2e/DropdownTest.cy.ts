describe('Dropdown list Suite', () => {

    it('Dropdown List Test', () =>{

        cy.visit('https://example.cypress.io/commands/actions');

        // index
        // cy.get('.action-select').select(1);

        // visible text
        // cy.get('.action-select').select('bananas');

        // value
        cy.get('.action-select').select('fr-oranges');

    })
})