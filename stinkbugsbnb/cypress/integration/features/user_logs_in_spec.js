// As a user,
// So that I can access my account,
// I need to be able to login

context('user can sign in', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  xit('requires email', function (){
    cy.get('#Submit').click()
    cy.contains('Please fill in this field.')
  });

  xit('requires password', function (){
    cy.get('input[name=email_address]')
      .type('test@gmail.com{enter}')
    cy.contains('email and password combination incorrect')
  });

  xit('requires valid username and password', function (){
    cy.get('input[name=email_address]')
      .type('test@gmail.com')
    cy.get('input[name=password]')
      .type('invalid{enter}')
    cy.contains('email and password combination incorrect')
  });

  it('navigates to /display-property on successful login', function (){
    cy.get('input[name=email_address]')
      .type('test@gmail.com')
    cy.get('input[name=password]')
      .type('valid{enter}')
    cy.url().should('eq', 'http://localhost:3000/display-property')
  });
})
