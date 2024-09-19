import prisma from '../../app/libs/prismadb';
import HomePage from './Pages/Homepage.cy';

describe('Register', () => {
  let credentials;

    beforeEach('Open Homepage', () => {

      cy.fixture('register.json').then((data) => {
        credentials = data
      });

      cy.visit('http://localhost:3000/');  
      HomePage.signup();
    })

    it('1. Empty form', () => {
      cy.get('.inline-flex').click();
      cy.get('#password').should('have.class', 'border-rose-500')
      cy.get('#email').should('have.class', 'border-rose-500')
      cy.get('#name').should('have.class', 'border-rose-500')
    })

    it('2. No password no name', () => {
      cy.get('#email').clear().type(credentials.email);
      cy.get('.inline-flex').click();
      cy.get('#password').should('have.class', 'border-rose-500')
      cy.get('#name').should('have.class', 'border-rose-500')
    })

    it('3. No password', () => {
      cy.get('#email').clear().type(credentials.email);
      cy.get('#name').clear().type(credentials.name);
      cy.get('.inline-flex').click();
      cy.get('#password').should('have.class', 'border-rose-500')
    })

    it('4. Register success', () => {
      cy.get('#email').clear().type(credentials.email);
      cy.get('#name').clear().type(credentials.name);
      cy.get('#password').clear().type(credentials.password);
      cy.get('.inline-flex').click();
      cy.get('.go2072408551').should('have.text', "Success!")
    });

    after('Delete user', () => {
      cy.request({
        method: 'DELETE',
        url: 'http://localhost:3000/api/cypress/delete-user',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          email: credentials.email
        }
      });
    });
    
})