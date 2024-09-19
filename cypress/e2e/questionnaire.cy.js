
import HomePage from './Pages/Homepage.cy';

describe('Questionnaire', () => {
        let credentials;
        let questionnaire;
        
        before('Get data', () => {
            cy.fixture('login.json').then((data) => {
                credentials = data
            });
            cy.fixture('questionnaire.json').then((data) => {
                questionnaire = data
            })
        })

        beforeEach('Open Homepage', () => {
            
            cy.visit('http://localhost:3000/');

            //Login
            HomePage.login(credentials);
        })

        it('Fill in questionnaire', () => {
            cy.get('.inline-flex').click();

            //Travel preferences
            cy.get('[data-testid="select-trigger"]').eq(0).click(); 
            cy.get('[data-testid="select-item"]') 
            .contains(questionnaire.q1) 
            .click();

            cy.get('[data-testid="select-trigger"]').eq(1).click(); 
            cy.get('[data-testid="select-item"]') 
            .contains(questionnaire.q2) 
            .click();

            cy.get('[data-testid="select-trigger"]').eq(2).click(); 
            cy.get('[data-testid="select-item"]') 
            .contains(questionnaire.q3) 
            .click();
            cy.get('.flex-col.p-6 > .flex > :nth-child(2)').click()

            // //Lifestyle and interests
            // cy.get('.react-select__input-container').select(questionnaire.q4);
            // cy.get('.flex-auto > .gap-8 > :nth-child(3) > .flex').select(questionnaire.q5)
            // cy.get('.flex-col.p-6 > .flex > :nth-child(2)').click()

            // //Timing and duration
            // cy.get('.flex-auto > .gap-8 > :nth-child(2) > .flex').select(questionnaire.q6)
            // cy.get('.flex-auto > .gap-8 > :nth-child(3) > .flex').select(questionnaire.q7)
            // cy.get('.flex-col.p-6 > .flex > :nth-child(2)').click()

            // cy.get('.gap-2 > .flex > :nth-child(2)').click()

        })
    }
)