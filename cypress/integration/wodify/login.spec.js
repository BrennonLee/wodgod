describe('login to wodify', () => {
    it('allows me to login', () => {
        cy.viewport('macbook-15')
        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.visit('/SignIn/Login?OriginalURL=&RequiresConfirm=false')
        cy.get('[id=Input_UserName]').type(username).should('have.value', username)
        cy.get('[id=Input_Password]').type(password).should('have.value', password)
        cy.get('.signin-btn').click()

        let waited = false
        /**
         * @return Bluebird<string>
         */
        function waitOneSecond () {
            // return a promise that resolves after 1 second
            return new Cypress.Promise((resolve, reject) => {
            setTimeout(() => {
                // set waited to true
                waited = true
    
                // resolve with 'foo' string
                resolve('foo')
            }, 1000)
            })
        }

        cy.then(() => {
            return waitOneSecond().then((str) => {
                cy.visit('Mobile/Class_Schedule.aspx')
                // Click 5 times to get 5 days ahead
                cy.get('[id=wt51_wtMainContent_wt31]').click()
                cy.wait(500)
                cy.get('[id=wt51_wtMainContent_wt31]').click()
                cy.wait(400)
                cy.get('[id=wt51_wtMainContent_wt31]').click()
                cy.wait(500)
                cy.get('[id=wt51_wtMainContent_wt31]').click()
                cy.wait(400)
                cy.get('[id=wt51_wtMainContent_wt31]').click()
                cy.wait(500)
                // TODO test
                cy.get('.ClassButton').eq(1).should('contain', "Reserve").click()
                // 7am class is the 5th button down
                // cy.get('.ClassButton').eq(4).should('contain', "Reserve").click()
            })
        })
    })
})