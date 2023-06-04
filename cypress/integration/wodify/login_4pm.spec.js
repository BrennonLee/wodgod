describe('login to wodify', () => {
    it('allows me to login', () => {
        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.visit('/SignIn/Login?OriginalURL=&RequiresConfirm=false')
        cy.wait(1000)
        cy.get('[id=Input_UserName]').type(username).should('have.value', username)
        cy.get('[id=Input_Password]').type(password).should('have.value', password)
        cy.get('.signin-btn').click()

        let waited = false
        /**
         * @return Bluebird<string>
         */
        function waitThreeSeconds () {
            // return a promise that resolves after 3 seconds
            return new Cypress.Promise((resolve, reject) => {
            setTimeout(() => {
                // set waited to true
                waited = true
    
                // resolve with 'foo' string
                resolve('foo')
            }, 3000)
            })
        }
        
        const now = new Date()
        // Add 5 days to the current date for next reservation
        now.setDate(now.getDate() + 5)
        const nextSignUpDateInput = `${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()}`

        cy.then(() => {
            return waitThreeSeconds().then((str) => {
                // Navigate to the calendar page
                cy.visit('Schedule/CalendarListViewEntry.aspx')
                cy.wait(500)
                // Click on the date input box and input current date + 5 days
                cy.get('[id=AthleteTheme_wt6_block_wtMainContent_wt9_W_Utils_UI_wt216_block_wtDateInputFrom]')
                .clear()
                .type(`${nextSignUpDateInput}{enter}`)
                cy.wait(2000)
                // 4pm open gym button
                // cy.get('[id=AthleteTheme_wt6_block_wtMainContent_wt9_wtClassTable_ctl15_wtAddReservationLink2]').click()
                // 4pm class reservation
                cy.get('[id=AthleteTheme_wt6_block_wtMainContent_wt9_wtClassTable_ctl16_wtAddReservationLink2]').click()
                cy.wait(1000)
            })
        })
    })
})