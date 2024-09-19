import Homepage from './Pages/Homepage.cy';

describe('Login Suite', () => {
    let credentials;

    before('Get data', () => {

        cy.fixture('login.json').then((data) => {
            credentials = data;
        })

    })

    beforeEach('Open Homepage', () => {

        cy.visit('http://localhost:3000/');

        // open login modal
        cy.get('.p-4').click();
        cy.get('.absolute > .flex > :nth-child(1)').click();

    })

    it('1. Empty form', () => {
        cy.get('.inline-flex').click();
        cy.get('#email').should('have.class', 'border-rose-500')
        cy.get('#password').should('have.class', 'border-rose-500')
      })
  
    it('2. No password', () => {
        cy.get('#email').clear().type(credentials.email);
        cy.get('.inline-flex').click();
        cy.get('#password').should('have.class', 'border-rose-500')
    })

    it('3. No email', () => {
        cy.get('#password').clear().type(credentials.password);
        cy.get('.inline-flex').click();
        cy.get('#email').should('have.class', 'border-rose-500')
    })
    
    it('4. Wrong email', () => {
        cy.get('#email').clear().type('test6@gmail.com');
        cy.get('#password').clear().type(credentials.password);
        cy.get('.inline-flex').click();
        cy.get('.go2072408551').contains('Invalid credentials');
    })

    it('5. Wrong password', () => {
        cy.get('#email').clear().type(credentials.email);
        cy.get('#password').clear().type('test6');
        cy.get('.inline-flex').click();
        cy.get('.go2072408551').contains('Invalid credentials');
    })

    it('6. Login success', () => {
        cy.get('#email').clear().type(credentials.email);
        cy.get('#password').clear().type(credentials.password);
        cy.get('.inline-flex').click();
        cy.get('.go2072408551').contains('Logged in');
    })

})