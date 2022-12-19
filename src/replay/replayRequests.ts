import {CyHttpMessages} from "cypress/types/net-stubbing";
import RequestCollection from "../utility/RequestCollection";
import createFixtureFilename, {createMergedFixtureFilename} from "../utility/createFixtureFilename";
import EnvComponentManager from "../utility/EnvComponentManager";
import Logger from "../utility/Logger";
import {ReplayConfig} from "../index";

export default function recordRequests(configuration: ReplayConfig) {
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
            const collection = new RequestCollection(dynamicComponentManager, logger);
            collection.appendFromFixture(fileContents);
            return collection;
        }).then(requestCollection => cy.wrap<Promise<RequestCollection>, RequestCollection>(new Promise<RequestCollection>((resolve) => {
            cy.readFile(
                createMergedFixtureFilename(Cypress.config().fixturesFolder as string, Cypress.spec.name, Cypress.currentTest.titlePath)
            ).should(mergeFixture => {
                if (mergeFixture) {
                    requestCollection.appendFromFixture(mergeFixture);
                }
                resolve(requestCollection);
            });
        }), {log: false})).then(requestCollection => {
            cy.intercept(new RegExp(configuration.interceptPattern || ".*"), (req: CyHttpMessages.IncomingHttpRequest) => {
                const fixtureResponse = requestCollection.shiftRequest(req);
                if (fixtureResponse) {
                    req.reply({
                        ...fixtureResponse,
                        delay: configuration.responseDelayOverride !== undefined ? configuration.responseDelayOverride : fixtureResponse.delay,
                    });
                }
            });
        });
    });

    afterEach(() => {
        logger.getAll().map(log => cy.log(`cypress-replay: ${log.message}\n\n${JSON.stringify(log.context)}`));
    });
}
