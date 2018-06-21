// As a user,
// So that I can access my account,
// I need to be able to login

context('user can sign in', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup')
    cy.get('input[name=user_name]')
      .type('TestingTheLoginPage')
    cy.get('input[name=email_address]')
      .type('testingtheloginpage@gmail.com')
    cy.get('input[name=password]')
      .type('password')
    cy.get('input[name=password_confirmation]')
      .type('password')
    cy.get('#sign_up_form').submit()
  })

  // it('requires email', function (){
  //   cy.get('#Submit').click()
  //   cy.contains('Please fill in this field.')
  // });
  //
  // it('requires password', function (){
  //   cy.get('input[name=email_address]')
  //     .type('test@gmail.com{enter}')
  //   cy.contains('email and password combination incorrect')
  // });
  //
  // it('requires valid username and password', function (){
  //   cy.get('input[name=email_address]')
  //     .type('test@gmail.com')
  //   cy.get('input[name=password]')
  //     .type('invalid{enter}')
  //   cy.contains('email and password combination incorrect')
  // });

  context('When login details valid', function(){
    it('Greets user with name on /display-property', function (){
      cy.visit('http://localhost:3000/login')
      cy.get('input[name=email_address]')
        .type('testingtheloginpage@gmail.com')
      cy.get('input[name=password]')
        .type('password{enter}')

      cy.url().should('eq', 'http://localhost:3000/display-property')
      cy.contains('Welcome, TestingTheLoginPage')
    });
  });

  context('When login details invalid', function(){
    it('Greets user with name on /display-property', function (){
      cy.visit('http://localhost:3000/login')
      cy.get('input[name=email_address]')
        .type('testingtheloginpage@gmail.com')
      cy.get('input[name=password]')
        .type('wrongpassword{enter}')

      cy.url().should('eq', 'http://localhost:3000/login')
    });
  });

})
