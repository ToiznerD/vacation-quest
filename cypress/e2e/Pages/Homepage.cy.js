 class HomePage {



    elements = {
        searchBar : () => cy.get('.py-4 > .w-full > .justify-between'),
        myAccount : () => cy.get('.p-4'),
    }


    clickSearchBar(){
        this.elements.searchBar().click()
    }

    openChangePassword(){
        this.elements.myAccount().click();
        cy.contains('Change password').click();
    }

    openMyQuestionnaire() {
        this.elements.myAccount().click();
        cy.contains('My Questionnaire').click();
    }

    logout() {
        this.elements.myAccount().click();
        cy.contains('Logout').click();
    }

    signup() {
        this.elements.myAccount().click();
        cy.get('.absolute > .flex > :nth-child(2)').click();
        cy.contains('Register').should('exist');
    }

    login(credentials) {
        this.elements.myAccount().click();
        cy.contains('Login').click();
        cy.get('#email').clear().type(credentials.email);
        cy.get('#password').clear().type(credentials.password);
        cy.get('.inline-flex').click();
        cy.get('.go2072408551').should('exist');
        this.elements.myAccount().click();
    }
}

export default new HomePage();