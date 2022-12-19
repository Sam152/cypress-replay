import {CyHttpMessages, StaticResponse} from "cypress/types/net-stubbing";
import createRequestKey from "./createRequestKey";
import EnvComponentManager from "./EnvComponentManager";
import IncomingRequest = CyHttpMessages.IncomingRequest;
import Logger, {LoggerInterface} from "./Logger";

export type RequestMap = {
    [key: string]: StaticResponse[],
};
export type RequestMapFixture = {
    [key: string]: (StaticResponse & {insertAtIndex?: number})[],
};

export default class RequestCollection {
    private envComponentManager: EnvComponentManager;
    public requests: RequestMap;
    private logger: LoggerInterface;

    constructor(envComponentManager: EnvComponentManager, logger?: LoggerInterface) {
        this.envComponentManager = envComponentManager;
        this.logger = logger || new Logger();
        this.requests = {};
    }

    appendFromFixture(fixture: RequestMapFixture) {
        Object.keys(fixture).forEach(key => {
            if (!this.requests[key]) {
                this.requests[key] = [];
            }
            fixture[key].forEach(request => {
                // Allow requests in fixture files to specify an index where they'll be inserted. This gives
                // some control over where manually authored fixtures are inserted, otherwise they'll be
                // appended in the order they are encountered.
                if (request.insertAtIndex) {
                    this.requests[key].splice(request.insertAtIndex, 0, request);
                }
                else {
                    this.requests[key].push(request);
                }
            });
        });
    }

    pushIncomingRequest(request: IncomingRequest, response: StaticResponse) {
        const key = this.envComponentManager.removeDynamicComponents(createRequestKey(request));
        if (!this.requests[key]) {
            this.requests[key] = [];
        }
        this.requests[key].push(response);
    }

    shiftRequest(request: IncomingRequest): StaticResponse | null {
        const key = this.envComponentManager.removeDynamicComponents(createRequestKey(request));
        if (!this.requests[key] || this.requests[key].length === 0) {
            this.logger.push('Request missing from fixture', {key});
            return null;
        }
        this.logger.push('Request found in fixture', {key});
        return this.requests[key].shift()!;
    }

}
