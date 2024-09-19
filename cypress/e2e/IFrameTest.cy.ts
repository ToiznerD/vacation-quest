import 'cypress-iframe'

describe('IFrame Suite', () => {
    it('IFrame Test', () => {
  
      cy.visit('./iframesdemo.html');

      // frame name
      // cy.frameLoaded('[name="myframe"]');

      // frame id
      cy.frameLoaded('#buttonframe');

      cy.iframe().contains('About').click();
    
    })

  })