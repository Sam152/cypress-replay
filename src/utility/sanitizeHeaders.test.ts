import { describe, expect, test } from "@jest/globals";
import createRequestKey from "./createRequestKey";
import sanitizeHeaders from "./sanitizeHeaders";

test("bad headers are removed", () => {
    expect(
        sanitizeHeaders({
            "content-encoding": "gzip",
        })
    ).toEqual({});
});

test("array headers are squashed", () => {
    expect(
        sanitizeHeaders({
            "foo-header": ["bar", "baz"],
        })
    ).toEqual({ "foo-header": "bar,baz" });
});
