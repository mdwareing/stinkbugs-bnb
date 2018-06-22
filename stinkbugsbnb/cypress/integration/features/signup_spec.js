// As a user,
// So that I can get onto the platform,
// I need to be able to sign up

context('user signs up', () => {
 beforeEach(() => {
   cy.visit('http://localhost:3000/signup')
 });

 context('When user enters valid information', function(){
   it('creates user then redirects to /display-property with welcome msg', function(){
     cy.get('input[name=user_name]')
       .type('Rob')
     cy.get('input[name=email_address]')
       .type('robert@gmail.com')
     cy.get('input[name=password]')
       .type('password')
     cy.get('input[name=password_confirmation]')
       .type('password')
     cy.get('#sign_up_form').submit()

     cy.url().should('eq', 'http://localhost:3000/display-property')
     cy.contains('Welcome, Rob')
   });

   context('When the email already exists in the database', function(){
     it('it notifies user that email address already in use', function(){
      
      cy.request('POST', 'http://localhost:3000/signup_form', {
        user_name: 'TestingTheLoginPage',
        email_address: 'testingtheloginpage@gmail.com',
        password: 'password',
        password_confirmation: 'password',
      });

      cy.get('input[name=user_name]')
         .type('Rob')
      cy.get('input[name=email_address]')
         .type('testingtheloginpage@gmail.com')
      cy.get('input[name=password]')
         .type('password')
      cy.get('input[name=password_confirmation]')
         .type('password')
      cy.get('#sign_up_form').submit()
   
      cy.contains('Email address already exists. Please use login.')
      cy.url().should('eq', 'http://localhost:3000/signup_form')

     });
   });

 });

 context('When user enters invalid information', function(){
   context('When password & confirmation password dont match', function(){
     it('notifies user that passwords do not match', function(){
     });
   });

   context('When password is under 8 characters', function(){
     it('prompts user to enter more characters', function(){
     });
   });

   context('When name is empty', function(){
     it('notifies user that name cannot be blank', function(){
     });
   });
  });
});
