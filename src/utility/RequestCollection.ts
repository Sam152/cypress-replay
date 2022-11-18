import {CyHttpMessages, StaticResponse} from "cypress/types/net-stubbing";
import IncomingRequest = CyHttpMessages.IncomingRequest;
import createRequestKey from "./createRequestKey";

export default class RequestCollection {
    public requests: {
        [key: string]: StaticResponse[],
    };

    constructor() {
        this.requests = {};
    }

    addRequest(request: IncomingRequest, response: StaticResponse) {
        const key = createRequestKey(request);
        if (!this.requests[key]) {
            this.requests[key] = [];
        }
        this.requests[key].push(response);
    }

    popRequest(key: string): StaticResponse {
        return {
            body: "",
            headers: {
                "a": "b",
            },
            statusCode: 200,
        };
    }

}
