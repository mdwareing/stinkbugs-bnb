context('user adds property with form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('there is an email entry in the form', () => {
    cy.get('input[name=property_name]')
      .type('Villa Horrorio')
    cy.get('input[name=price_per_night]')
      .type('140')
    cy.get('input[name=property_specs]')
      .type('5 bedrooms, large terrace, beautiful views')
    cy.get('input[name=location]')
      .type('Sardinia')
    cy.get('input[name=detailed_description]')
      .type('Cool property in the heart of Sardinia. No dogs allowed.')
    cy.get('input[name=email_address]')
      .type('test@email.com')
    cy.get('#add_property-form').submit()
      // .next().should('contain', 'Villa Horrorio', '140', '5 bedrooms', 'Cool property in the heart of Sardinia. No dogs allowed.')
    cy.contains('Villa Horrorio')
  })

})
