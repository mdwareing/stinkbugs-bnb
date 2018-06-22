context('User logs out', function(){
  it('welcome message disappears when user logged out', function(){
    cy.visit('http://localhost:3000/signup')
    cy.get('input[name=user_name]')
      .type('Rob')
    cy.get('input[name=email_address]')
      .type('robert@gmail.com')
    cy.get('input[name=password]')
      .type('password')
    cy.get('input[name=password_confirmation]')
      .type('password')
    cy.get('#sign_up_form').submit()
    cy.visit('http://localhost:3000/logout')
    cy.contains('Log In or Sign Up')
    });
  });
