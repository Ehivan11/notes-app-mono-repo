describe('Note App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')

        cy.request('POST', 'http://localhost:3001/api/testing/reset')

        const user = {
            name: 'Ehivan',
            username: 'ehivankovich11',
            password: '12345678'
        }

        cy.request('POST', 'http://localhost:3001/api/users', user)
    })

    it('frontpage can be opened', () => {
        cy.contains('Notes')
    })

    it('login form can be opened', () => {
        cy.contains('Show').click()
    })

    it('user can login', () => {
        cy.contains('Show').click()
        cy.get('input[name="Username"]').type('ehivankovich11')
        cy.get('input[name="Password"]').type('12345678')
        cy.get('#form-login-button').click()
        cy.contains('New note')
    })

    it('login fails with wrong password', () => {
        cy.contains('Show').click()
        cy.get('input[name="Username"]').type('ehivankovich11')
        cy.get('input[name="Password"]').type('incorret-password')
        cy.get('#form-login-button').click()

        cy.get('.error').should('contain', 'Wrong credentials')
    })

    describe('When user logged in', () => {
        beforeEach(() => {
            cy.login({
                username: 'ehivankovich11',
                password: '12345678'
            })
        })

        it('a new note can be created', () => {
            const noteContent = 'New note create with Cypress'
            cy.contains('New note').click()
            cy.get('input').type(noteContent)
            cy.contains('Save').click()
            cy.contains(noteContent)
        })

        describe.only('and a note exists', () => {
            beforeEach(() => {
                cy.createNote({
                    content: 'This is the first note',
                    important: false
                })

                cy.createNote({
                    content: 'This is the second note',
                    important: false
                })

                cy.createNote({
                    content: 'This is the third note',
                    important: false
                })
            })
            it('it can be made important', () => {
                cy.contains('This is the second note').as('theNote')
                
                cy.get('@theNote').contains('make important').click()

                cy.get('@theNote').contains('make not important')
            })
        })
    })
})