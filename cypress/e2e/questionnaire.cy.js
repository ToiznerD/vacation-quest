
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

        })

        after('Tear down', () => {
            cy.request({
                method: 'DELETE',
                url: 'http://localhost:3000/api/cypress/delete-questionnaire',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: {
                  email: credentials.email
                }
              });
        })
    }
)