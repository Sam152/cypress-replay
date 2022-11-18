import {describe, expect, test} from '@jest/globals';
import createRequestKey from "./createRequestKey";

test('that request keys are created from normal GET requests', () => {
    expect(
        createRequestKey({
            body: "",
            headers: {},
            url: "https://example.com/foo/bar",
            method: "GET",
            query: {},
            httpVersion: "1.1",
        })
    ).toEqual("GET:https://example.com/foo/bar")
});

test('that request keys are created from normal GET requests', () => {
    expect(
        createRequestKey({
            body: "",
            headers: {},
            url: "https://example.com/foo/bar",
            method: "GET",
            query: {
                "foo": "Bar",
            },
            httpVersion: "1.1",
        })
    ).toEqual("GET:https://example.com/foo/bar:{\"foo\":\"Bar\"}")
});

test('that request keys are created from POST body with JSON object', () => {
    expect(
        createRequestKey({
            body: {"post": "body"},
            headers: {},
            url: "https://example.com/foo/bar",
            method: "POST",
            query: {},
            httpVersion: "1.1",
        })
    ).toEqual("POST:https://example.com/foo/bar:{\"post\":\"body\"}")
});

test('that request keys are created from POST body with binary body', () => {
    expect(
        createRequestKey({
            body: Buffer.from("abc"),
            headers: {},
            url: "https://example.com/foo/bar",
            method: "POST",
            query: {},
            httpVersion: "1.1",
        })
    ).toEqual("POST:https://example.com/foo/bar:abc:{\"type\":\"Buffer\",\"data\":[97,98,99]}")
});
