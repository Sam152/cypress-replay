import {CyHttpMessages, StaticResponse} from "cypress/types/net-stubbing";
import createRequestKey from "./createRequestKey";
import EnvComponentManager from "./EnvComponentManager";
import IncomingRequest = CyHttpMessages.IncomingRequest;
import Logger, {LoggerInterface} from "./Logger";

export type RequestMap = Map<string, Promise<StaticResponse>[]>
export type RequestMapFixture = {
    [key: string]: (StaticResponse & {insertAtIndex?: number})[],
};
export type ResponseMap = {
    [key: string]: StaticResponse[],
};

export default class RequestCollection {
    private envComponentManager: EnvComponentManager;
    public requests: RequestMap;
    private logger: LoggerInterface;

    constructor(envComponentManager: EnvComponentManager, logger?: LoggerInterface) {
        this.envComponentManager = envComponentManager;
        this.logger = logger || new Logger();
        this.requests = new Map();
    }

    appendFromFixture(fixture: RequestMapFixture) {
        Object.keys(fixture).forEach(key => {
            if (!this.requests.has(key)) {
                this.requests.set(key, []);
            }
            fixture[key].forEach(request => {
                // Allow requests in fixture files to specify an index where they'll be inserted. This gives
                // some control over where manually authored fixtures are inserted, otherwise they'll be
                // appended in the order they are encountered.
                if (request.insertAtIndex) {
                    this.requests.get(key)!.splice(request.insertAtIndex, 0, Promise.resolve(request));
                }
                else {
                    this.requests.get(key)!.push(Promise.resolve(request));
                }
            });
        });
    }

    pushIncomingRequest(request: IncomingRequest, response: Promise<StaticResponse>) {
        const key = this.envComponentManager.removeDynamicComponents(createRequestKey(request));
        if (!this.requests.has(key)) {
            this.requests.set(key, []);
        }
        this.requests.get(key)!.push(response);
    }

    shiftRequest(request: IncomingRequest): Promise<StaticResponse | null> {
        const key = this.envComponentManager.removeDynamicComponents(createRequestKey(request));
        if (!this.requests.has(key) || this.requests.get(key)!.length === 0) {
            this.logger.push('Request missing from fixture', {key});
            return Promise.resolve(null);
        }
        this.logger.push('Request found in fixture', {key});
        return Promise.resolve(this.requests.get(key)!.shift()!);
    }

    async resolveResponseMap(): Promise<ResponseMap> {
        const responses: ResponseMap = {};
        for (const [key, response] of this.requests) {
            responses[key] = await Promise.all(response);
        }
        return responses;
    }
}
