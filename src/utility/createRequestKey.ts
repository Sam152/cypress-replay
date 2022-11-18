import {CyHttpMessages} from "cypress/types/net-stubbing";
import IncomingRequest = CyHttpMessages.IncomingRequest;

export default function createRequestKey(request: IncomingRequest) {
    const keyComponents = [
        request.method,
        request.url,
    ];

    if (Object.keys(request.query).length) {
        keyComponents.push(JSON.stringify(request.query));
    }
    if (Buffer.isBuffer(request.body)) {
        keyComponents.push(request.body.toString());
    }
    if (typeof request.body === 'object') {
        keyComponents.push(JSON.stringify(request.body));
    }

    return keyComponents.join(':');
}
