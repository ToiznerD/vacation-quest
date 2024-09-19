import HomePage from './Pages/Homepage.cy';

describe('Register', () => {
    before('Open Homepage', () => {
      cy.visit('http://localhost:3000/');  
    })

    /* ==== Test Created with Cypress Studio ==== */
    it('Register success', function() {
      HomePage.signup();
      // HomePage.elements.myAccount().click();
      // cy.get('.absolute > .flex > :nth-child(2)').click();
      // cy.get('#email').clear('c');
      // cy.get('#email').type('cypress@gmail.com');
      // cy.get('#name').clear('c');
      // cy.get('#name').type('cypress');
      // cy.get('#password').clear('1');
      // cy.get('#password').type('123123');
      // cy.get('.inline-flex').click();
      // cy.get('#email').clear('c');
      // cy.get('#email').type('cypress@gmail.com');
      // cy.get('#password').clear('1');
      // cy.get('#password').type('123123');
      // cy.get('.inline-flex').click();
      // cy.get('.go2072408551').click();
      // cy.get('.rounded-t').click();
      // cy.get('.inline-flex').click();
      // cy.get('.flex-col.p-6 > .flex > :nth-child(2)').click();
      // cy.get('.react-select__input-container').click();
      // cy.get('#react-select-3-option-0').click();
      // cy.get('#react-select-3-option-1').click();
      // cy.get('.react-select__input-container').click();
      // cy.get('.flex-col.p-6 > .flex > :nth-child(2)').click();
      // cy.get('.flex-col.p-6 > .flex > :nth-child(2)').click();
      // cy.get('.gap-2 > .flex > :nth-child(2)').click();
      // cy.get('.p-4').click();
      /* ==== End Cypress Studio ==== */
    });
})