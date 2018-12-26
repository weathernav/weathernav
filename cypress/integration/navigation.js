describe('Navigation', function() {
  context('if route is long enough for weather', function(){
    before(()=> {
      const locations = [
        'Tucker, GA',
        'Austin, TX'
      ]
      cy.visit('http://localhost:3000')
      cy.get('input').each((el, i)=>{
        cy.wrap(el)
          .type(locations[i])
          .type('{downarrow}{enter}', {delay: 500})
      })
    })
    it('should render weather infoboxes', ()=> {
      cy.get('.infoBox').should('have.length', 7)
    })
  })

  context('if route is not long enough for weather', function(){
    before(()=> {
      const locations = [
        'Tucker, GA',
        'Atlanta, GA'
      ]
      cy.visit('http://localhost:3000')
      cy.get('input').each((el, i)=>{
        cy.wrap(el)
          .type(locations[i])
          .type('{downarrow}{enter}', {delay: 500})
      })
    })
    it('should not render weather infoboxes', ()=> {
      cy.get('.infoBox').should('have.length', 0)
    })
  })
})
