context('host adds a property', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('when signed in host can add a property', () => {
    // User logs in
    // cy.get('input[name=email_address]')
    //   .type('test@gmail.com')
    // cy.get('input[name=password]')
    //   .type('valid{enter}')

    // User fills in the property form
    cy.get('input[name=property_name]')
      .type('Villa Horrorio')
    cy.get('input[name=price_per_night]')
      .type('140')
    cy.get('input[name=guests]')
      .type('4')
    cy.get('input[name=bedrooms]')
      .type('3')
    cy.get('input[name=beds]')
      .type('3')
    cy.get('input[name=bathrooms]')
      .type('2')
    cy.get('input[name=location]')
      .type('Sardinia')
    cy.get('textarea[name=detailed_description]')
      .type('Cool property in the heart of Sardinia. No dogs allowed.')
    cy.get('input[name=date_available]')
      .type('2018-01-01')
    cy.get('input[name=date_available]')
      .type('2018-12-31')
    cy.get('#add_property-form').submit()

    // page should contain the property spec
    cy.contains('Villa Horrorio')
    cy.contains('140')
    cy.contains('4')
    cy.contains('3')
    cy.contains('3')
    cy.contains('2')
    cy.contains('Sardinia')
    cy.contains('Cool property in the heart of Sardinia. No dogs allowed.')
    cy.contains('01012018')
    cy.contains('31122018')
  })
})
