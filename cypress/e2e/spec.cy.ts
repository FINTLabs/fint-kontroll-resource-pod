describe('Check resource home page', () => {

    const searchText = 'Adobe';
    const userType = 'STUDENT';

    beforeEach(() => {
        const baseUrl = "http://localhost:3001/api";
        cy.interceptAndReturnFile("GET", `${baseUrl}/orgunits`, "orgunits.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/orgunits/orgTree`, "orgunits.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/users?size=5`, "users.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/users?search=${searchText}&orgUnits=36`, "users.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/users?userType=${userType}`, "users.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/users`, "users.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/resources?size=5`, "resources.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/layout/configuration`, "layout.json");
    });

    it('Connect to localhost', () => {
        cy.visit('http://localhost:3001/ressurser')
    })

    it('Check type in searchField, and clear input', () => {
        cy.goToHome();
        cy.get('#outlined-search-resource').should('exist')
        cy.get('#outlined-search-resource').should('have.value', '')
        cy.get('#showClearIcon').should('not.be.visible')
        cy.get('#outlined-search-resource').type(searchText).should('have.value', searchText)
        cy.get('#showClearIcon').should('be.visible')
        cy.get('#outlined-search-resource').should('be.visible')
        cy.get('#showClearIcon').click();
        cy.get('#outlined-search-resource').should('have.value', '')
    })

    it('Check table (exists, has 3 rows)', () => {
        cy.goToHome();
        cy.get('#resourceTable')
            .should('be.visible')
            .find('tbody tr')
            .should('have.length', 3);
        cy.wait(2000)
    });

    it('Select resource and go to page for resource details', () => {
        cy.goToHome();
        cy.get('#iconResourceInfo-1').should('exist')
        cy.wait(1000)
        cy.get('#iconResourceInfo-1').click()
        cy.wait(1000)
    });
})
describe('Check the resource details page', () => {

    const searchTextUser = 'Karen';

    beforeEach(() => {
        const baseUrl = "http://localhost:3001";
        cy.interceptAndReturnFile("GET", `${baseUrl}/api/resources`, "resources.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/api/resources/1`, "resourceDetailed.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/api/assignments`, "assignedUsers.json");
        cy.intercept("POST", `${baseUrl}/api/assignments`, "createAssignment.json").as('postValueconverting');
        cy.interceptAndReturnFile("GET", `${baseUrl}/layout/configuration`, "layout.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/api/assignments/resource/1/users?size=5`, "assignedUsers.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/api/assignments/resource/1/roles?size=5`, "assignedRoles.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/api/users/?size=5`, "users.json");


    });

    it('Connect to localhost for resource info', () => {
        cy.visit('http://localhost:3001/ressurser/info/1')
    })

    /*it('Check searchfield for user, type and clear input', () => {
        cy.goToInfo();
        cy.get('#outlined-search-user').should('exist')
        cy.get('#outlined-search-user').should('have.value', '')
        cy.get('#showClearIcon').should('not.be.visible')
        cy.get('#outlined-search-user').type(searchTextUser).should('have.value', searchTextUser)
        cy.wait(1000)
        cy.get('#showClearIcon').should('be.visible')
        cy.get('#outlined-search-user').should('be.visible')
        cy.wait(1000)
        cy.get('#showClearIcon').click();
        cy.get('#outlined-search-user').should('have.value', '')
    });*/

    /*it('Check select usertype (options, clickable)', () => {
        cy.goToInfo();
        cy.get('#brukertype').should('exist')
        cy.get('#valg-brukertype').should('have.text', 'Brukertype')
        cy.get('#brukertype').click();
        cy.get('[data-value="STUDENT"]').click()
        cy.get('#brukertype').should('have.text', 'Elev')
        cy.get('#brukertype').click();
        cy.get('[data-value="EMPLOYEE"]').click()
        cy.get('#brukertype').should('have.text', 'Ansatt')
        cy.get('#brukertype').click();
    })*/

    it('Check role assignment table (exists, has 5 rows)', () => {
        cy.goToInfo();
        cy.get('#roleAssignmentTable')
            .should('be.visible')
            .find('tbody tr')
            .should('have.length', 5);
    });

    it('Check select objecttype (options, clickable)', () => {
        cy.goToInfo();
        cy.get('#select-users-or-groups').should('exist')
        cy.get('#velg-bruker-eller-gruppe').should('have.text', 'Velg Brukere / Grupper')
        cy.get('#select-users-or-groups').click();
        cy.wait(2000)
        cy.get('[data-value="Grupper"]').click()
        cy.get('#select-users-or-groups').should('have.text', 'Grupper')
        cy.get('[data-value="Brukere"]').click()
        cy.get('#select-users-or-groups').should('have.text', 'Brukere')
        cy.get('#select-users-or-groups').click();
        cy.wait(2000)
    })

    it('Check user table (exists, has 5 rows)', () => {
        cy.goToInfo();
        cy.get('#select-users-or-groups').click();
        cy.get('[data-value="Brukere"]').click()
        cy.get('#userTable')
            .should('be.visible')
            .find('tbody tr')
            .should('have.length', 5);
    });

    it('Delete assignment', () => {
       // cy.interceptAndReturnFile("GET", `${baseUrl}/api/assignments`, "afterCreateAssignment.json");
        cy.goToInfo();
        cy.wait(2000)
        cy.get('#buttonDeleteRoleAssignment-51').should('exist')
        cy.get('#buttonDeleteRoleAssignment-51').should('have.text', 'Slett')
        cy.get('#buttonDeleteRoleAssignment-51').click()
        cy.get('#delete-dialog').should('exist')
        cy.wait(2000)
        cy.get('#delete-button').should('exist')
        cy.wait(2000)
        cy.get('#delete-button').click()
       // cy.interceptAndReturnFile("GET", `http://localhost:3001/api/assignments`, "afterDeleteAssignment.json");

    });

    it('Pagination (select number of rows in table)', () => {
        cy.goToInfo();
        cy.get('#paginationAssignment').should('be.visible')
        cy.get('.MuiTablePagination-select').should('exist').select('10')
        cy.wait(2000)
    });

    it('Pagination (iconButton go to "Next page")', () => {
        cy.goToInfo();
        cy.get('#iconNextPage').should('exist')
        cy.wait(2000)
        const goToNextPage = () => {
            cy.get('#iconNextPage').invoke('attr', 'disabled').then(disabled => {
                if (disabled === 'disabled') {
                    cy.get('#iconNextPage').should('have.attr', 'disabled')
                } else {
                    cy.get('#iconNextPage').click().then(goToNextPage)
                }
            })
        }
        goToNextPage()
        cy.wait(2000)
    });

    it('Pagination (iconButton go to "Last page" and then "previous page")', () => {
        cy.goToInfo();
        cy.get('#iconLastPage').should('exist')
        cy.wait(2000)
        const goToLastPage = () => {
            cy.get('#iconLastPage').invoke('attr', 'disabled').then(disabled => {
                if (disabled === 'disabled') {
                    cy.get('#iconLastPage').should('have.attr', 'disabled')
                } else {
                    cy.get('#iconLastPage').click()
                }
            })
        }
        goToLastPage()
        cy.wait(2000)

        const goToPreviousPage = () => {
            cy.get('#iconPreviousPage').invoke('attr', 'disabled').then(disabled => {
                if (disabled === 'disabled') {
                    cy.get('#iconPreviousPage').should('have.attr', 'disabled')
                } else {
                    cy.get('#iconPreviousPage').click().then(goToPreviousPage)
                }
            })
        }
        goToPreviousPage()
        cy.wait(2000)
    });

    it('Pagination (icon go to "First page", after clicking forward)', () => {
        cy.goToInfo();
        cy.get('#iconNextPage').should('exist')
        cy.wait(2000)
        const goToNextPage = () => {
            cy.get('#iconNextPage').invoke('attr', 'disabled').then(disabled => {
                if (disabled === 'disabled') {
                    cy.get('#iconNextPage').should('have.attr', 'disabled')
                } else {
                    cy.get('#iconNextPage').click().then(goToNextPage)
                }
            })
        }
        goToNextPage()
        cy.wait(2000)

        cy.get('#iconFirstPage').should('exist')
        const goToFirstPage = () => {
            cy.get('#iconFirstPage').invoke('attr', 'disabled').then(disabled => {
                if (disabled === 'disabled') {
                    cy.get('#iconFirstPage').should('have.attr', 'disabled')
                } else {
                    cy.get('#iconFirstPage').click().then(goToFirstPage)
                }
            })
        }
        goToFirstPage()
    });

    it('Button to page for assignments', () => {
        cy.goToInfo();
        cy.get('#button-add-assignment').should('exist');
        cy.get('#button-add-assignment').click()
    });



    /*it('Button for adding assignment to user', () => {
        cy.goToInfo();
        cy.get('#buttonAddAssignment-109').should('exist')
        cy.wait(1000)
        cy.get('#buttonAddAssignment-109').should('have.text', 'Tildel')
        cy.get('#buttonAddAssignment-109').click()
        cy.wait(1000)
        cy.wait('@postValueconverting').its('request.body').should('deep.equal', {
                resourceRef: "1",
                userRef: "109",
                organizationUnitId: "36"
            }
        )
    });*/
})

describe('Check the assignment button after assign', () => {

    const baseUrl = "http://localhost:3001";
    beforeEach(() => {
        cy.interceptAndReturnFile("GET", `${baseUrl}/api/resources?size=5`, "resources.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/api/resources/1`, "resourceDetailed.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/api/users?size=5`, "users.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/api/roles?size=5`, "roles.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/api/assignments`, "afterCreateAssignment.json");
        cy.interceptAndReturnFile("GET", `${baseUrl}/layout/configuration`, "layout.json");


        // cy.intercept("DELETE", `${baseUrl}/api/assignments/15`, "afterCreateAssignment.json").as('afterDeleted');

    });

    it('Connect to localhost for assignments', () => {
        cy.visit('http://localhost:3001/ressurser/info/1/tildeling')
    })

    it('Check role table (exists, has 5 rows)', () => {
        cy.goToAssignments();
        cy.get('#roleTable').should('exist')
            .should('be.visible')
            .find('tbody tr')
          //  .should('have.length', 5);
    });

     it('Check if assign button is disabled after assignment', () => {
         cy.interceptAndReturnFile("GET", `${baseUrl}/api/assignments`, "afterCreateAssignment.json");
         cy.goToAssignments();
         cy.wait(2000)
         cy.get('#buttonAddAssignmentRole-17').should('have.text', 'Tildelt')
         cy.get('#buttonAddAssignmentRole-17').should('be.disabled')
    //
     });

    // it('Show disabled button for assigned users', () => {
    //     cy.interceptAndReturnFile("GET", `${baseUrl}/api/assignments`, "afterCreateAssignment.json");
    //     cy.goToAssignments();
    //     cy.wait(2000)
    //     cy.get('#buttonAddAssignment-109').should('have.text', 'Tildelt')
    //     cy.get('#buttonAddAssignment-109').should('be.disabled')
    // });



    // it('Check assignment table (switching tables, and button text)', () => {
    //     cy.interceptAndReturnFile("GET", `${baseUrl}/api/assignments`, "assignedUsers.json");
    //     cy.goToAssignments();
    //     cy.interceptAndReturnFile("GET", `${baseUrl}/api/assignments?size=1000`, "afterCreateAssignment.json");
    //     cy.get('#button-only-assigned').should('exist')
    //     cy.get('#button-only-assigned').should('have.text', 'Se kun tildelte')
    //     cy.get('#button-only-assigned').click()
    //     cy.get('#assignedUserTable')
    //         .should('be.visible')
    //     cy.get('#button-only-assigned').should('exist')
    //     cy.get('#button-only-assigned').should('have.text', 'Se alle brukere')
    //     cy.get('#button-only-assigned').click()
    //     cy.get('#userTable').should('exist')
    // });
})