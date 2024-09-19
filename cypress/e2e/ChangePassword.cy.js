import Homepage from './Pages/Homepage.cy';

describe('Change Password Suite', () => {
    let credentials;

    before('Get data', () => {

        cy.fixture('changePassword.json').then((data) => {
            credentials = data;
        })

    })

    beforeEach('Open Homepage', () => {

        cy.visit('http://localhost:3000/');

        // login
        Homepage.login(credentials);

        // open change password modal
        Homepage.openChangePassword();
    })

    it('1. Empty form', () => {
        cy.get('.inline-flex').click();
        cy.get('#oldPassword').should('have.class', 'border-rose-500')
        cy.get('#newPassword').should('have.class', 'border-rose-500')
        cy.get('#confirmNewPassword').should('have.class', 'border-rose-500')
      })
  
      it('2. No new password no confirmed password', () => {
        cy.get('#oldPassword').clear().type(credentials.password);
        cy.get('.inline-flex').click();
        cy.get('#newPassword').should('have.class', 'border-rose-500')
        cy.get('#confirmNewPassword').should('have.class', 'border-rose-500')
      })

      it('3. No confirmed password', () => {
        cy.get('#oldPassword').clear().type(credentials.password);
        cy.get('#newPassword').clear().type(credentials.newPassword);
        cy.get('.inline-flex').click();
        cy.get('#confirmNewPassword').should('have.class', 'border-rose-500')
      })
  
      it('4. Wrong old password', () => {
        cy.get('#oldPassword').clear().type('12345');
        cy.get('#newPassword').clear().type(credentials.newPassword);
        cy.get('#confirmNewPassword').clear().type(credentials.confirmNewPassword);
        cy.get('.inline-flex').click();
        cy.get('.go2072408551').contains('Old password is incorrect');
      })

      it('5. Mismatch new password', () => {
        cy.get('#oldPassword').clear().type(credentials.password);
        cy.get('#newPassword').clear().type(credentials.newPassword);
        cy.get('#confirmNewPassword').clear().type('123456');
        cy.get('.inline-flex').click();
        cy.get('.go3958317564').contains('Confirmed password is wrong');
      })

      it('6. Change password success', () => {
        cy.get('#oldPassword').clear().type(credentials.password);
        cy.get('#newPassword').clear().type(credentials.newPassword);
        cy.get('#confirmNewPassword').clear().type(credentials.confirmNewPassword);
        cy.get('.inline-flex').click();
        cy.get('.go3958317564').contains('Password has been changed successfully');
      })
  
      after('Restore password', () => {
        cy.request({
          method: 'PUT',
          url: 'http://localhost:3000/api/cypress/restore-password',
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            email: credentials.email,
            password: credentials.password
          }
        });
      });
})