import {CyHttpMessages} from "cypress/types/net-stubbing";
import IncomingRequest = CyHttpMessages.IncomingRequest;

export default function createRequestKey(request: IncomingRequest) {
    const keyComponents = [
        request.method,
        request.url,
    ];

    if (typeof request.body === 'object') {
        keyComponents.push(JSON.stringify(request.body));
    }

    return keyComponents.join(':');
}
