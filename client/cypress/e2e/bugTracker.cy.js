describe('Bug Tracker E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should create and delete a bug', () => {
    cy.get('[data-testid="title-input"]').type('E2E Test Bug');
    cy.get('[data-testid="description-input"]').type('E2E Test Description');
    cy.get('[data-testid="submit-button"]').click();
    
    cy.get('[data-testid="bug-list"]').should('contain', 'E2E Test Bug');
    
    cy.get('[data-testid="delete-button-1"]').click();
    cy.get('[data-testid="bug-list"]').should('not.contain', 'E2E Test Bug');
  });

  it('should handle error state', () => {
    // Simulate server error
    cy.intercept('POST', '/api/bugs', {
      statusCode: 500,
      body: { message: 'Server Error' }
    });
    
    cy.get('[data-testid="title-input"]').type('Error Test Bug');
    cy.get('[data-testid="description-input"]').type('Error Test Description');
    cy.get('[data-testid="submit-button"]').click();
    
    cy.get('[data-testid="bug-list"]').should('not.contain', 'Error Test Bug');
    cy.contains('Server Error').should('be.visible');
  });
});