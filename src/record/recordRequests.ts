import {CyHttpMessages} from "cypress/types/net-stubbing";
import RequestCollection from "../utility/RequestCollection";
import sanitizeHeaders from "../utility/sanitizeHeaders";
import createFixtureFilename from "../utility/createFixtureFilename";
import EnvComponentManager from "../utility/EnvComponentManager";
import {ReplayConfig} from "../index";

export default function recordRequests(configuration: ReplayConfig) {
    let requestCollection: RequestCollection;
    const dynamicComponentManager = EnvComponentManager.fromEnvironment(configuration.dynamicRequestEnvComponents || [], Cypress.env);

    beforeEach(() => {
        requestCollection = new RequestCollection(dynamicComponentManager);

        cy.intercept(new RegExp(configuration.interceptPattern || ".*"), (request: CyHttpMessages.IncomingHttpRequest) => {
            const startTime = Date.now();

            request.on("after:response", (response: CyHttpMessages.IncomingResponse) => {
                requestCollection.pushIncomingRequest(request, {
                    body: response.body,
                    headers: sanitizeHeaders(response.headers),
                    statusCode: response.statusCode,
                    // Including a delay that matches how long the server took to response will help make tests more
                    // deterministic.
                    delay: Date.now() - startTime,
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
