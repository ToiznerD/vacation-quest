
import HomePage from './Pages/Homepage.cy';

describe('Questionnaire', () => {
        let credentials;
        let questionnaire;
        let questionnaireEdit;

        before('Get data', () => {
            cy.fixture('login.json').then((data) => {
                credentials = data
            });
            cy.fixture('questionnaire.json').then((data) => {
                questionnaire = data
            })
            cy.fixture('questionnaire-edit.json').then((data) => {
                questionnaireEdit = data
            })
        })

        beforeEach('Open Homepage', () => {
            
            cy.visit('http://localhost:3000/');

            //Login
            HomePage.login(credentials);
        })

        it('1. Fill in questionnaire', () => {
            cy.get('.inline-flex').click();

            // Travel preferences
            // Q1
            cy.get('[data-testid="select-trigger"]').eq(0).click(); 
            cy.get('[data-testid="select-item"]') 
            .contains(questionnaire.q1) 
            .click();
            // Q2
            cy.get('[data-testid="select-trigger"]').eq(1).click(); 
            cy.get('[data-testid="select-item"]') 
            .contains(questionnaire.q2) 
            .click();
            // Q3
            cy.get('[data-testid="select-trigger"]').eq(2).click(); 
            cy.get('[data-testid="select-item"]') 
            .contains(questionnaire.q3) 
            .click();
            cy.get('.flex-col.p-6 > .flex > :nth-child(2)').click()

            // Lifestyle and interests
            // Q4
            cy.get('.react-select__control').click(); 
            questionnaire.q4.forEach((ans) => {
                cy.get('.react-select__option').contains(ans).click();
            })
            cy.get('.react-select__control').click(); 
            // Q5
            cy.get('[data-testid="select-trigger"]').click();
            cy.get('[data-testid="select-item"]') 
            .contains(questionnaire.q5) 
            .click();
            cy.get('.flex-col.p-6 > .flex > :nth-child(2)').click();

            // Timing and duration
            // Q6
            cy.get('[data-testid="select-trigger"]').eq(0).click(); 
            cy.get('[data-testid="select-item"]') 
            .contains(questionnaire.q6) 
            .click();
            // Q7
            cy.get('[data-testid="select-trigger"]').eq(1).click(); 
            cy.get('[data-testid="select-item"]') 
            .contains(questionnaire.q7) 
            .click();
            cy.get('.flex-col.p-6 > .flex > :nth-child(2)').click();

            // Send questionnaire
            cy.get('.gap-2 > .flex > :nth-child(2)').click();

            cy.get('.go2072408551').should('have.text', "Questionnaire has been saved")
        })

        it('2. Edit Questionnaire', () => {
            HomePage.openMyQuestionnaire();

            cy.get('.inline-flex').click();

            // Travel preferences
            // Q1
            cy.get('[data-testid="select-trigger"]').eq(0).click(); 
            cy.get('[data-testid="select-item"]') 
            .contains(questionnaireEdit.q1) 
            .click();
            // Q2
            cy.get('[data-testid="select-trigger"]').eq(1).click(); 
            cy.get('[data-testid="select-item"]') 
            .contains(questionnaireEdit.q2) 
            .click();
            // Q3
            cy.get('[data-testid="select-trigger"]').eq(2).click(); 
            cy.get('[data-testid="select-item"]') 
            .contains(questionnaireEdit.q3) 
            .click();
            cy.get('.flex-col.p-6 > .flex > :nth-child(2)').click()

            // Lifestyle and interests
            // Q4
            cy.get('.react-select__control').click(); 
            questionnaireEdit.q4.forEach((ans) => {
                cy.get('.react-select__option').contains(ans).click();
            })
            cy.get('.react-select__control').click(); 
            // Q5
            cy.get('[data-testid="select-trigger"]').click();
            cy.get('[data-testid="select-item"]') 
            .contains(questionnaireEdit.q5) 
            .click();
            cy.get('.flex-col.p-6 > .flex > :nth-child(2)').click();

            // Timing and duration
            // Q6
            cy.get('[data-testid="select-trigger"]').eq(0).click(); 
            cy.get('[data-testid="select-item"]') 
            .contains(questionnaireEdit.q6) 
            .click();
            // Q7
            cy.get('[data-testid="select-trigger"]').eq(1).click(); 
            cy.get('[data-testid="select-item"]') 
            .contains(questionnaireEdit.q7) 
            .click();
            cy.get('.flex-col.p-6 > .flex > :nth-child(2)').click();

            // Send questionnaire
            cy.get('.gap-2 > .flex > :nth-child(2)').click();

            cy.get('.go2072408551').should('have.text', "Questionnaire has been updated successfully")
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