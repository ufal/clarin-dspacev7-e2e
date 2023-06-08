import {noRetry} from "../support/e2e";

describe('ufal-point-dev', () => {

  it('privacy statement should not be lorem ipsum', function() {
    cy.visit('/info/privacy');
    cy.contains('Lorem ipsum dolor sit amet', noRetry).should('not.exist');
  });

})
