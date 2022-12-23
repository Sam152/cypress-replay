import { describe, expect, test } from "@jest/globals";
import EnvComponentManager from "./EnvComponentManager";

test("the manager can remove dynamic components", () => {
    const manager = new EnvComponentManager({
        MY_API_ENDPOINT: "https://example.com/",
    });
    expect(manager.removeDynamicComponents("some input https://example.com/ test")).toEqual("some input {MY_API_ENDPOINT} test");
});

test("the manager can add dynamic components back in", () => {
    const manager = new EnvComponentManager({
        MY_API_ENDPOINT: "https://example.com/",
    });
    expect(manager.insertDynamicComponents("some input {MY_API_ENDPOINT} test")).toEqual("some input https://example.com/ test");
});

test("can init from the environment", () => {
    const resolver = (envVar: string): string => ({ MY_API_ENDPOINT: "https://example.com/" }[envVar]!);
    const manager = EnvComponentManager.fromEnvironment(["MY_API_ENDPOINT"], resolver);
    expect(manager.insertDynamicComponents("some input {MY_API_ENDPOINT} test")).toEqual("some input https://example.com/ test");
});
