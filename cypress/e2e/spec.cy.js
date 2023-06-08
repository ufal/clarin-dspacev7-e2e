const noRetry = {timeout: 0};
describe('ufal-point-dev', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('loads', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    /* ==== End Cypress Studio ==== */
  });

  it('privacy statement should not be lorem ipsum', function() {
    cy.visit('/info/privacy');
    cy.contains('Lorem ipsum dolor sit amet', noRetry).should('not.exist');
  });

  it('Language names instead of iso', function() {
    cy.visit('/');
    cy.contains('Language (ISO)').then(($el) => {
      const p = cy.get($el.parent());
      p.contains('ces (', noRetry).should('not.exist');
      p.contains('eng (', noRetry).should('not.exist');
      p.contains('zxx (', noRetry).should('not.exist');
    })
  });
})
