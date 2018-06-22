// As a user,
// So that I can access my account,
// I need to be able to login

context('user can sign in', () => {
  beforeEach(() => {
   // Register a user in the datbase
   cy.request('POST', 'http://localhost:3000/signup_form', {
     user_name: 'TestingTheLoginPage',
     email_address: 'testingtheloginpage@gmail.com',
     password: 'password',
     password_confirmation: 'password',
   });
 });

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
    it('Invalid password returns user to login page', function (){
      cy.visit('http://localhost:3000/login')
      cy.get('input[name=email_address]')
        .type('testingtheloginpage@gmail.com')
      cy.get('input[name=password]')
        .type('wrongpassword{enter}')

      cy.url().should('eq', 'http://localhost:3000/login')
    });

    it('Invalid email returns user to login page', function (){
      cy.visit('http://localhost:3000/login')
      cy.get('input[name=email_address]')
        .type('completelyWrongEmail@gmail.com')
      cy.get('input[name=password]')
        .type('irrelevantPassword{enter}')

      cy.url().should('eq', 'http://localhost:3000/login')
    });
  });
});
