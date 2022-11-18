import enableCypressReplay from "../../../../src/enableCypressReplay";
import {ReplayMode} from "../../../../src";

context('Cypress Replay', () => {
  enableCypressReplay(ReplayMode.Recording);

  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/network-requests')
  });

  it('test capturing and replaying requests in first block', () => {
    cy.get('.network-btn').click();
    cy.get('body').contains('laudantium enim quasi est');
  });

  it('test capturing and replaying requests in second block', () => {
    cy.get('.network-post').click();
    cy.get('body').contains('POST successful!');

    cy.get('.network-put').click();
  });
})
