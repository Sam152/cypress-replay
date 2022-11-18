import {CyHttpMessages} from "cypress/types/net-stubbing";
import loadConfiguration from "../utility/loadConfiguration";
import RequestCollection from "../utility/RequestCollection";
import createFixtureFilename from "../utility/createFixtureFilename";
import EnvComponentManager from "../utility/EnvComponentManager";

export default function recordRequests() {
    let requestCollection: RequestCollection;
    const configuration = loadConfiguration();
    const dynamicComponentManager = EnvComponentManager.fromEnvironment(configuration.dynamicRequestEnvComponents || [], Cypress.env);

    beforeEach(() => {
        const file = cy.readFile(
            createFixtureFilename(
                Cypress.config().fixturesFolder as string,
                Cypress.spec.name,
                Cypress.currentTest.titlePath
            )
        );

        file.then(fileContents => {
            requestCollection = new RequestCollection(dynamicComponentManager, fileContents);
        });

        cy.intercept(new RegExp(loadConfiguration().interceptPattern), (req: CyHttpMessages.IncomingHttpRequest) => {
            const fixtureResponse = requestCollection.shiftRequest(req);
            if (fixtureResponse) {
                req.reply(fixtureResponse);
            }
        });
    });
}
