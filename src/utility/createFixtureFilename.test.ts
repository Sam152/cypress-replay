import { describe, expect, test } from "@jest/globals";
import createFixtureFilename, { createMergedFixtureFilename } from "./createFixtureFilename";

test("that sanitized filenames are created", () => {
    expect(createFixtureFilename("/var/foo/bar", "my_sample_spec.ts", ["Sample Test", "it really works!"])).toEqual(
        "/var/foo/bar/my_sample_spec.ts/Sample-Test-it-really-works.json"
    );
});

test("that a merged path can be created", () => {
    expect([
        createFixtureFilename("/path", "spec.ts", ["spec", "test"]),
        createMergedFixtureFilename("/path", "spec.ts", ["spec", "test"]),
    ]).toEqual(["/path/spec.ts/spec-test.json", "/path/spec.ts/spec-test.merged.json"]);
});
