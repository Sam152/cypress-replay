
import {CyHttpMessages} from "cypress/types/net-stubbing";
import loadConfiguration from "../utility/loadConfiguration";
import RequestCollection from "../utility/RequestCollection";
import processHeaders from "../utility/processHeaders";
import createFixtureFilename from "../utility/createFixtureFilename";

export default function recordRequests() {

    const requestCollection = new RequestCollection();

    beforeEach(() => {
        cy.log(`creating with: ${createFixtureFilename(Cypress.spec.name, Cypress.currentTest.titlePath)}`)

        cy.intercept(new RegExp(loadConfiguration().interceptPattern), (req: CyHttpMessages.IncomingHttpRequest) => {
            req.on("after:response", (response: CyHttpMessages.IncomingResponse) => {
                requestCollection.addRequest(req, {
                    body: response.body,
                    headers: processHeaders(response.headers),
                    statusCode: response.statusCode,
                });
            });
        });
    });

    afterEach(() => {

        // cy.log(`ending with ${JSON.stringify(requestCollection.requests)}`);

        cy.log(`creating with: ${createFixtureFilename(Cypress.spec.name, Cypress.currentTest.titlePath)}`)

        // cy.task('cypress-replay:dump-file', ['foo']);
    });
}
