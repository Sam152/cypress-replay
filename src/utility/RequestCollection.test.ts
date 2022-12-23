import {expect, test} from '@jest/globals';
import RequestCollection from "./RequestCollection";
import EnvComponentManager from "./EnvComponentManager";

const requestA = {
    body: "",
    headers: {a: "b"},
    method: "GET",
    url: "https://example.com/api",
    query: {},
    httpVersion: "1.1",
};
const requestB = {
    body: "",
    headers: {a: "b"},
    method: "GET",
    url: "https://example.com/api/different-endpoint",
    query: {},
    httpVersion: "1.1",
};

test('requests can be pushed and popped from the collection', async () => {
    const collection = new RequestCollection(new EnvComponentManager({}));

    collection.pushIncomingRequest(requestA, Promise.resolve({
        body: "Request A first response"
    }));
    collection.pushIncomingRequest(requestB, Promise.resolve({
        body: "Request B response"
    }));
    collection.pushIncomingRequest(requestA, Promise.resolve({
        body: "Request A second response"
    }));

    expect((await collection.shiftRequest(requestB))?.body).toEqual("Request B response");
    expect(await collection.shiftRequest(requestB)).toEqual(null);
    expect((await collection.shiftRequest(requestA))?.body).toEqual("Request A first response");
    expect((await collection.shiftRequest(requestA))?.body).toEqual("Request A second response");
    expect(await collection.shiftRequest(requestA)).toEqual(null);
});

test('responses can be appended from fixtures', () => {
    const collection = new RequestCollection(new EnvComponentManager({}));
    collection.appendFromFixture({
        "GET:foo": [
            {
                body: "foo",
            },
            {
                body: "bar",
            }
        ],
    });
    collection.appendFromFixture({
        "GET:foo": [
            {
                insertAtIndex: 1,
                body: "baz",
            },
        ],
    });

    expect(collection.resolveResponseMap()).resolves.toEqual({
        "GET:foo": [
            {
                body: "foo",
            },
            {
                insertAtIndex: 1,
                body: "baz",
            },
            {
                body: "bar",
            }
        ],
    });
});

test('the response map can be resolved from pending requests that have yet to complete', () => {
    const collection = new RequestCollection(new EnvComponentManager({}));
    collection.pushIncomingRequest(requestA, new Promise((resolve) => {
        setTimeout(() => resolve({
            body: "delayed response"
        }), 25);
    }));
    expect(collection.resolveResponseMap()).resolves.toEqual({
        "GET:https://example.com/api": [
            {
                "body": "delayed response",
            },
        ],
    });
});
