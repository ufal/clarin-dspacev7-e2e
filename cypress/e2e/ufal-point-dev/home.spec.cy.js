import {noRetry} from "../../support/e2e";

describe('homepage', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Language names instead of iso', function() {
        cy.contains('Language (ISO)').then(($el) => {
            const p = cy.get($el.parent());
            p.contains('ces (', noRetry).should('not.exist');
            p.contains('eng (', noRetry).should('not.exist');
            p.contains('zxx (', noRetry).should('not.exist');
        })
    });

    it('Should not use handles when navigating the repository', function() {
        /**
         * When using handles:
         * 1. It's hard to test in non production environment (item-view opens in production)
         * 2. It's an extra redirect repository -> handle server -> repository
         * 3. You'd be goint from https (repository) to http (handle server) and back to https (repository)
         */
        cy.get('a.item-name').should('have.attr', 'href').then( (href) => {
            expect(href).to.not.contain('hdl.handle.net');
        });
    });

});
