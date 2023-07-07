describe('search functionality', () => {
    /**
     * clarin-dspace=# select count(*) as cnt, owning_collection, text_value as name from item join metadatavalue on resource_type_id = 3 and owning_collection = resource_id and metadata_field_id = 64 where withdrawn=false and in_archive=true group by owning_collection, name order by cnt desc;
     *  cnt | owning_collection |                             name
     * -----+-------------------+---------------------------------------------------------------
     *  787 |                15 | Bohumil Vesely Gallery
     *  782 |                 9 | LRT + Open Submissions Data & Tools
     *  461 |                 2 | LINDAT / CLARIAH-CZ Data & Tools
     *   59 |                19 | Memorable Funerals
     *   46 |                16 | Wikitongues Oral Histories
     *   34 |                13 | The Munich Agreement
     *   29 |                17 | The Heydrich Terror
     *   18 |                18 | Birth of Czechoslovakia and celebrations of its anniversaries
     *    6 |                12 | LINDAT / CLARIAH-CZ Web Services
     *    4 |                14 | LINDAT / CLARIAH-CZ DH Data
     */
    //convert the table above to name count pairs
    const collections = [    {name: 'Bohumil Vesely Gallery', count: 787},
    {name: 'LRT + Open Submissions Data & Tools', count: 782},
    // !! {name: 'LINDAT / CLARIAH-CZ Data & Tools', count: 461}, actually 460, one is discoverable:false
    {name: 'Memorable Funerals', count: 59},
    {name: 'Wikitongues Oral Histories', count: 46, should_be_visible: false},// these are not public
    {name: 'The Munich Agreement', count: 34},
    {name: 'The Heydrich Terror', count: 29},
    {name: 'Birth of Czechoslovakia and celebrations of its anniversaries', count: 18},
    {name: 'LINDAT / CLARIAH-CZ Web Services', count: 6, should_be_visible: false}, // these should not be public
    {name: 'LINDAT / CLARIAH-CZ DH Data', count: 4}];

    it('collection counts as anonymous match database counts', function() {
        cy.visit('/');
        cy.get('.btn').click();

        collections.filter(collection => collection.should_be_visible !== false).forEach(collection  => {
            cy.get('.scope-button').click();
            cy.get('ds-dso-selector > .form-group > .form-control').clear();
            // see the other test for why we need to replace the name
            cy.get('ds-dso-selector > .form-group > .form-control').type(collection.name.replace('LINDAT / CLARIAH-CZ', '').trim());
            cy.contains(collection.name).click();
            cy.get('.pagination-info', {timeout: 15000}).should('contain', 'of '.concat(collection.count));
        });

        collections.filter(collection => collection.should_be_visible === false).forEach(collection  => {
            cy.get('.scope-button').click();
            cy.get('ds-dso-selector > .form-group > .form-control').clear();
            // see the other test for why we need to replace the name
            cy.get('ds-dso-selector > .form-group > .form-control').type(collection.name.replace('LINDAT / CLARIAH-CZ', '').trim());
            cy.contains(collection.name).click()
            cy.intercept({
                'method': 'GET',
                'pathname': '/repository/api/discover/search/objects',
                'query': {
                    'dsoType': 'ITEM',
                }}).as('fetchSearchResults');
            cy.wait('@fetchSearchResults');
            cy.contains('Loading search results...', {timeout: 15000}).should('not.exist');
            cy.get('.pagination-info').should('not.exist');
        });
    });


    // it('results count as anonymous', function() {
    //     cy.visit('/');
    //     cy.get('.btn').click();
    //     // num results
    //     // `select count(*) from item where withdrawn=false and in_archive=true;` => 2226
    //     // 46 items in wikitongues collection are not public
    //     // 1 item in LINDAT / CLARIAH-CZ Data & Tools is not discoverable
    //
    //
    //     cy.get('.pagination-info').should('contain', 'of '.concat(2226-46-1));
    // });


    // TODO
    //navigation uses handles
    //LINDAT / CLARIAH in the search scope (the ` / `) seems to break things; getting 422 An error occurred searching for a community, collection Unprocessable or invalid entity
    // search scope is it a word matcher or subword?
    // End User Agreement is lorem ipsum


});

