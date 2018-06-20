context('users can sign up with form', () => {
  beforeEach( () => {
    cy.visit('http://localhost:3000/sign_up')
  })

  it('the form has email, password and password confirmation fields. sign up submit takes user to dashboard', () => {
    cy.get('input[name=user_name]')
      .type('Azlan')
    cy.get('input[name=email_address]')
      .type('testemail@email.com')
    cy.get('input[name=password]')
      .type('password')
    cy.get('input[name=password_confirmation]')
      .type('password')
    cy.get('#sign_up_form').submit()
    cy.contains('Welcome, Azlan')
  })
})
