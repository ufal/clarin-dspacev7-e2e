import {noRetry} from "../../support/e2e";

describe('ufal-point-dev', () => {

  it('privacy statement should not be lorem ipsum', function() {
    cy.visit('/info/privacy');
    cy.contains('Lorem ipsum dolor sit amet', noRetry).should('not.exist');
  });

  it('browse by should not contain untranslated strings', function() {
    cy.visit('/community-list');
    cy.contains('Language Resources').click();
    cy.contains('LINDAT / CLARIAH-CZ').click();
    cy.get('[aria-label="Browse Community or Collection"]').then(($el) => {
      cy.contains('browse.comcol.by', noRetry).should('not.exist');
    });
  });

})
