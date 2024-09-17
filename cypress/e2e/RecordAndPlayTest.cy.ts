describe('Recod and Play Suite', () => {
  it('Test1', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://www.youtube.com/');
    cy.get('#sb_ifc50 > #search').clear();
    cy.get('#sb_ifc50 > #search').type('testers talk');
    cy.get('#search-icon-legacy > yt-icon.style-scope > .yt-icon-shape > div').click();
    cy.get('.ytd-channel-renderer > #img').click();
    cy.get('#c4-player > .ytp-chrome-bottom > .ytp-chrome-controls > .ytp-left-controls > .ytp-play-button').click();
    cy.get(':nth-child(4) > ytd-playlist-thumbnail.style-scope > #thumbnail > #hover-overlays > .ytd-playlist-thumbnail > span.style-scope').click();
    /* ==== End Cypress Studio ==== */
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('JavaScriptByTestersTalk', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://www.youtube.com/');
    cy.get('#search-input > #search').click();
    cy.get('#sb_ifc50 > #search').clear();
    cy.get('#sb_ifc50 > #search').type('javascript by testers talk');
    cy.get('#search-icon-legacy').click();
    /* ==== End Cypress Studio ==== */
  });
})