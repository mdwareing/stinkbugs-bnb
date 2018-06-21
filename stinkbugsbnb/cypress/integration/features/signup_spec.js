context('user signs up', () => {
 beforeEach(() => {
   cy.visit('http://localhost:3000/signup')
 })

 context('When user enters valid information', function(){
   it('redirects to /display-property with welcome msg', function(){
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


 });

 // context('When user enters invalid information', function(){
 //  it('redirects to /display-property with welcome msg', function(){
 //     cy.get('input[name=user_name]')
 //       .type(" ")
 //
 //     cy.get('#sign_up_form').submit()
 //
 //
 //     cy.url().should('eq', 'http://localhost:3000/signup')
 //     cy.contains('Welcome, Rob')
 //   });
 //
 // });

})
