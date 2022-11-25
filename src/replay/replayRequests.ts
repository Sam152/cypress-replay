import {CyHttpMessages} from "cypress/types/net-stubbing";
import loadConfiguration from "../utility/loadConfiguration";
import RequestCollection from "../utility/RequestCollection";
import createFixtureFilename from "../utility/createFixtureFilename";
import EnvComponentManager from "../utility/EnvComponentManager";
import Logger from "../utility/Logger";

export default function recordRequests() {
    const configuration = loadConfiguration();
    const dynamicComponentManager = EnvComponentManager.fromEnvironment(configuration.dynamicRequestEnvComponents || [], Cypress.env);
    let logger: Logger;

    beforeEach(() => {
        logger = new Logger();
        cy.readFile(
            createFixtureFilename(
                Cypress.config().fixturesFolder as string,
                Cypress.spec.name,
                Cypress.currentTest.titlePath
            )
        ).then(fileContents => {
            return new RequestCollection(dynamicComponentManager, fileContents, logger);
        }).then(requestCollection => {
            cy.intercept(new RegExp(loadConfiguration().interceptPattern), (req: CyHttpMessages.IncomingHttpRequest) => {
                const fixtureResponse = requestCollection.shiftRequest(req);
                if (fixtureResponse) {
                    req.reply(fixtureResponse);
                }
            });
        });
    });

    afterEach(() => {
        logger.getAll().map(log => cy.log(`cypress-replay: ${log.message}`, log.context));
    });
}
