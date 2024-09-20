import Homepage from './Pages/Homepage.cy';

describe('Project Flow Suite', () => {
    let credentials;

    before('Get data', () => {

        cy.fixture('projectFlow.json').then((data) => {
            credentials = data;
        })

    })

    beforeEach('Open Homepage', () => {

        cy.visit('http://localhost:3000/');

        Homepage.login(credentials);

    })

    it('1. Flow', () => {
        cy.get('.py-4 > .w-full').click();
        cy.get('.border').clear().type(credentials.from);
        cy.get('.gap-8 > .flex > .bg-blue-500').click();
        cy.wait(2000);
        cy.get('.inline-flex').click();
        cy.get('.border').clear().type(credentials.to);
        cy.get('.gap-8 > .flex > .bg-blue-500').click();
        cy.wait(2000);
        cy.get('.flex-col.p-6 > .flex > :nth-child(2)').click();
        cy.get('.rdrYearPicker > select').select(credentials.year);
        cy.get('.rdrMonthPicker > select').select(credentials.month);
        cy.get(`:nth-child(${credentials.startDate}) > .rdrDayNumber`).click();
        cy.get(`:nth-child(${credentials.endDate}) > .rdrDayNumber`).click();
        cy.get('.gap-2 > .flex > :nth-child(2)').click();
        cy.get('.flex-auto > .gap-8 > :nth-child(2) > .flex-row > :nth-child(3)').click();
        cy.get('.gap-2 > .flex > :nth-child(2)').click();
        cy.wait(15000);
        cy.get(':nth-child(3) > .peer').click();
        cy.wait(2000);
        cy.get(':nth-child(3) > .peer').click();
        cy.contains('Select').eq(0).click();
        cy.wait(10000);
        cy.contains('Select').eq(0).should('exist');
        cy.contains('Next').click();
        cy.contains('Step 3/4').should('exist');
        cy.contains('Select').eq(0).click();
        cy.contains('Step 4/4').should('exist');
      })
})