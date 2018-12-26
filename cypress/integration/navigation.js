describe('Navigation', function() {
  const searchLocations= function(locations){
    cy.visit('http://localhost:3000')
    cy.get('input').each((el, i)=>{
      cy.wrap(el)
        .type(locations[i])
        .type('{downarrow}{enter}', {delay: 500})
    })
  }
  context('if route is long enough for weather', function(){
    before(()=> {
      const locations = [
        'Tucker, GA',
        'Austin, TX'
      ]
      searchLocations(locations)
    })
    it('should render weather infoboxes', ()=> {
      cy.get('.infoBox').its('length').should('be.gt', 0)
    })
  })

  context('if route is not long enough for weather', function(){
    before(()=> {
      const locations = [
        'Tucker, GA',
        'Atlanta, GA'
      ]
      searchLocations(locations)
    })
    it('should not render weather infoboxes', ()=> {
      cy.get('.infoBox').should('have.length', 0)
    })
  })
})
