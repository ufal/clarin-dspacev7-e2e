import {noRetry} from "../../support/e2e";

describe('item-view', () => {
  it('corefud language names instead of iso', function() {
    cy.view_item();
    cy.contains('Language(s)').then(($el) => {
      cy.get($el.parent().parent().parent()).then(($lang_row) => {
        cy.get($lang_row).contains('ces', noRetry).should('not.exist');
        cy.get($lang_row).contains('eng', noRetry).should('not.exist');
        cy.get($lang_row).contains('fra', noRetry).should('not.exist');
      });
      //debugger;
    })
  });
});