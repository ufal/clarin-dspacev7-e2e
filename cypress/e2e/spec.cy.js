describe('ufal-point-dev', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('loads', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    /* ==== End Cypress Studio ==== */
  });

  it('privacy statement should not be lorem ipsum', function() {
    cy.visit('/info/privacy');
    cy.contains('Lorem ipsum dolor sit amet', {timeout: 100}).should('not.exist');
  });
})
