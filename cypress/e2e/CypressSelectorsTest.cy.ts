describe('Cypress Selectors Suite', () => {

    it('Cypress Selector Test', () =>{

        cy.visit('https://www.youtube.com/@testerstalk');

        /* cy.visit('https://www.google.com/search?q=javascript+by+testers+talk');

        // selector by attribute(instead of [id="APjFqb"], it is possible to use [type="search"])
        cy.get('textarea[id="APjFqb"]').then((element) => {
            cy.log("Text from Google : " + element.text())
        });

        // selector by id
        cy.get('#APjFqb').then((element) => {
            cy.log("Text from Google : " + element.text())
        }); */

        // first
        // cy.get('.crJ18e > div a').first().click();

        // last
        // cy.get('.crJ18e > div a').last().click();

        // index
        //cy.get('.crJ18e > div a').eq(1).click();

        // start-with
        // cy.get('button[type^="sub"]').click();

        // end-with
        // cy.get('button[type$="mit"]').click();

        // contains - CSS
        // cy.get('button[type*="ubmi"]').click();

        // contains - Cypress
        // cy.contains('JavaScript by Testers Talk☑️').click({force: true});

        cy.get('yt-tab-shape > div').eq(2).click({force: true});
    })
})