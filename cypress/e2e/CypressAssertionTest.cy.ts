describe('Cypress Assertion Suite', () => {
    
    it('Cypress Assertion Test', () => {

        cy.visit('https://www.google.com/search?q=javascript+by+testers+talk');

        cy.get('textarea[id="APjFqb"]').then((element) => {
            expect(element.text()).to.equal("javascript by testers talk");
        })

        cy.get('textarea[id="APjFqb"]').should("have.text","javascript by testers talk");

        cy.get('textarea[id="APjFqb"]').should("contain","javascript by testers talk");

        // checking if an element is presented or not
        cy.get('textarea[id="APjFqb"]').should("be.visible");

        cy.get('textarea[id="APjFqb"]').should("have.html","javascript by testers talk");

        // checking if an element has this speific attribute
        cy.get('textarea[id="APjFqb"]').should("have.html","javascript by testers talk")
        .and ("have.attr","value");

        // checking if an element has this speific attribute
        // and contains the text in this attribute
        cy.get('textarea[id="APjFqb"]').should("have.html","javascript by testers talk")
        .and ("have.attr","value").and("include","javascript by testers talk");

        // checking if the text contains 26 characters
        cy.get('textarea[id="APjFqb"]').then((element) => {
            expect(element.text()).to.have.length(26);
        })

    })
    
})