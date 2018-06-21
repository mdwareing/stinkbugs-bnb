//As a user
//so I can interact with the platform
//I need to be able to sign up


context('users can sign up', () => {
  beforeEach( () => {
    cy.visit('http://localhost:3000/signup')
  })

  // it('the form has email, password and password confirmation fields. sign up submit takes user to dashboard', () => {
  //   cy.get('input[name=user_name]')
  //     .type('Azlan')
  //   cy.get('input[name=email_address]')
  //     .type('testemaiemail.com')
  //   cy.get('input[name=password]')
  //     .type('password')
  //   cy.get('input[name=password_confirmation]')
  //     .type('password')
  //   cy.get('#sign_up_form').submit()
  //   cy.contains('Welcome, Azlan')
  // })

  context('When user clicks submit', function(){
    
    it('it doesnt navigate to next page if name is left empty', function(){
      cy.get('input[name=email_address]')
        .type('testemahjghmail.com')
      cy.get('input[name=password]')
        .type('password')
      cy.get('input[name=password_confirmation]')
        .type('password')
      cy.get('#sign_up_form').submit()
      cy.url().should('eq', 'http://localhost:3000/signup')
    });


  });
 


})

