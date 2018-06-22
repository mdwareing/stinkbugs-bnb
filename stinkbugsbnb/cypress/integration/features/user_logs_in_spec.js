// As a user,
// So that I can access my account,
// I need to be able to login

context('user can sign in', () => {
  beforeEach(() => {
   // Register a user in the database
   cy.request('POST', 'http://localhost:3000/signup_form', {
     user_name: 'TestingTheLoginPage',
     email_address: 'testingtheloginpage@gmail.com',
     password: 'password',
     password_confirmation: 'password',
   });
   cy.visit('http://localhost:3000/login')
 });

  context('When login details valid', function(){
    it('Greets user with name on /display-property', function (){
      cy.get('input[name=email_address]')
        .type('testingtheloginpage@gmail.com')
      cy.get('input[name=password]')
        .type('password{enter}')

      cy.url().should('eq', 'http://localhost:3000/display-property')
      cy.contains('Welcome, TestingTheLoginPage')
    });
  });

  context('When login details invalid', function(){
    it('Invalid password returns user to login page', function (){
      cy.get('input[name=email_address]')
        .type('testingtheloginpage@gmail.com')
      cy.get('input[name=password]')
        .type('wrongpassword{enter}')

      cy.contains('Username and password are not correct')
      cy.url().should('eq', 'http://localhost:3000/login')
    });

    it('Invalid email returns user to login page', function (){
      cy.get('input[name=email_address]')
        .type('completelyWrongEmail@gmail.com')
      cy.get('input[name=password]')
        .type('irrelevantPassword{enter}')

      cy.contains('Username and password are not correct')
      cy.url().should('eq', 'http://localhost:3000/login')
    });
  });
});
