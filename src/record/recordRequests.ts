import {CyHttpMessages} from "cypress/types/net-stubbing";
import loadConfiguration from "../utility/loadConfiguration";
import RequestCollection from "../utility/RequestCollection";
import sanitizeHeaders from "../utility/sanitizeHeaders";
import createFixtureFilename from "../utility/createFixtureFilename";
import EnvComponentManager from "../utility/EnvComponentManager";

export default function recordRequests() {
    let requestCollection: RequestCollection;
    const configuration = loadConfiguration();
    const dynamicComponentManager = EnvComponentManager.fromEnvironment(configuration.dynamicRequestEnvComponents || [], Cypress.env);

    beforeEach(() => {
        requestCollection = new RequestCollection(dynamicComponentManager);

        cy.intercept(new RegExp(loadConfiguration().interceptPattern), (request: CyHttpMessages.IncomingHttpRequest) => {
            const startTime = (new Date()).getMilliseconds();

            request.on("after:response", (response: CyHttpMessages.IncomingResponse) => {
                const endTime = (new Date()).getMilliseconds();

                requestCollection.addRequest(request, {
                    body: response.body,
                    headers: sanitizeHeaders(response.headers),
                    statusCode: response.statusCode,
                    // Including a delay that matches how long the server took to response will help make tests more
                    // deterministic.
                    delay: endTime - startTime,
                });

            });
        });
    });

    afterEach(() => {
        cy.writeFile(
            createFixtureFilename(
                Cypress.config().fixturesFolder as string,
                Cypress.spec.name,
                Cypress.currentTest.titlePath
            ), JSON.stringify(requestCollection.requests, null, 4)
        );
    });
}
