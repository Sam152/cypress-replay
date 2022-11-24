import {CyHttpMessages, StaticResponse} from "cypress/types/net-stubbing";
import createRequestKey from "./createRequestKey";
import EnvComponentManager from "./EnvComponentManager";
import IncomingRequest = CyHttpMessages.IncomingRequest;

export type RequestMap = {
    [key: string]: StaticResponse[],
};

export default class RequestCollection {
    private envComponentManager: EnvComponentManager;
    public requests: RequestMap;

    constructor(envComponentManager: EnvComponentManager, requests?: RequestMap) {
        this.requests = requests || {};
        this.envComponentManager = envComponentManager;
    }

    addRequest(request: IncomingRequest, response: StaticResponse) {
        const key = this.envComponentManager.removeDynamicComponents(createRequestKey(request));
        if (!this.requests[key]) {
            this.requests[key] = [];
        }
        this.requests[key].push(response);
    }

    shiftRequest(request: IncomingRequest): StaticResponse | null {
        const key = this.envComponentManager.removeDynamicComponents(createRequestKey(request));
        if (!this.requests[key] || this.requests[key].length === 0) {
            return null;
        }
        return this.requests[key].shift()!;
    }

}
