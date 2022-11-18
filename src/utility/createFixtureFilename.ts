export default function createFixtureFilename(fixtureFolder: string, specName: string, specPath: string[]) {
    const pathComponents = [
        fixtureFolder,
        sanitizeForFileSystem(specName),
        `${specPath.map(sanitizeForFileSystem).join('-')}.json`,
    ]
    return pathComponents.join('/');
}

function sanitizeForFileSystem(input: string) {
    input = input.replaceAll(' ', '-');
    input = input.replace(/[^a-zA-Z0-9_.-]/, '');
    return input;
}
