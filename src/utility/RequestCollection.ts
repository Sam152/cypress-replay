import {CyHttpMessages, StaticResponse} from "cypress/types/net-stubbing";
import createRequestKey from "./createRequestKey";
import EnvComponentManager from "./EnvComponentManager";
import IncomingRequest = CyHttpMessages.IncomingRequest;
import Logger, {LoggerInterface} from "./Logger";

export type RequestMap = {
    [key: string]: StaticResponse[],
};

export default class RequestCollection {
    private envComponentManager: EnvComponentManager;
    public requests: RequestMap;
    private logger: LoggerInterface;

    constructor(envComponentManager: EnvComponentManager, requests?: RequestMap, logger?: LoggerInterface) {
        this.envComponentManager = envComponentManager;
        this.requests = requests || {};
        this.logger = logger || new Logger();
    }

    pushRequest(request: IncomingRequest, response: StaticResponse) {
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
