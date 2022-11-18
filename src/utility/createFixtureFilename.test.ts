import {describe, expect, test} from '@jest/globals';
import createFixtureFilename from "./createFixtureFilename";

test('that sanitized filenames are created', () => {
    expect(
        createFixtureFilename('/var/foo/bar', 'my_sample_spec.ts', ['Sample Test', 'it really works!'])
    ).toEqual('/var/foo/bar/my_sample_spec.ts/Sample-Test-it-really-works.json')
});
