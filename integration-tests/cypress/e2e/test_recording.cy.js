import enableCypressReplay, {ReplayMode} from "../../../src";

context('Cypress Replay', () => {
  // enableCypressReplay(ReplayMode.Replaying);
  enableCypressReplay(ReplayMode.Recording);

  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/network-requests')
  });

  it('test capturing and replaying requests in first block', () => {
    cy.get('.network-btn').click();
    cy.get('body').contains('laudantium enim quasi est');

    cy.get('.network-btn').click();
    cy.wait(1000);
  });

  it('test capturing and replaying requests in second block', () => {
    cy.get('.network-post').click();
    cy.get('body').contains('POST successful!');

    cy.get('.network-put').click();
    cy.wait(1000);
  });
});
