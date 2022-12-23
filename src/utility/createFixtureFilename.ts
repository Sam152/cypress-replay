export default function createFixtureFilename(fixtureFolder: string, specName: string, specPath: string[]) {
    return fixtureFilename(fixtureFolder, specName, specPath, "json");
}

export function createMergedFixtureFilename(fixtureFolder: string, specName: string, specPath: string[]) {
    return fixtureFilename(fixtureFolder, specName, specPath, "merged.json");
}

function fixtureFilename(fixtureFolder: string, specName: string, specPath: string[], extension: string) {
    const pathComponents = [
        fixtureFolder,
        sanitizeForFileSystem(specName),
        `${specPath.map(sanitizeForFileSystem).join("-")}.${extension}`,
    ];
    return pathComponents.join("/");
}

function sanitizeForFileSystem(input: string) {
    input = input.replaceAll(" ", "-");
    input = input.replace(/[^a-zA-Z0-9_.-]/, "");
    return input;
}
