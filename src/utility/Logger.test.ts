import { expect, test } from "@jest/globals";
import Logger from "./Logger";

test("the logger can push and read log messages", () => {
    const logger = new Logger();
    logger.push("foo", { bar: "baz" });
    logger.push("biz", { zip: "bap" });
    expect(logger.getAll()).toEqual([
        { context: { bar: "baz" }, message: "foo" },
        { context: { zip: "bap" }, message: "biz" },
    ]);
});
