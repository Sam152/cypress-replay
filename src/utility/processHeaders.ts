export default function processHeaders(headers: { [key: string]: string | string[] }): { [key: string]: string } {

    const processedHeaders: { [key: string]: string } = {};

    Object.keys(headers).forEach((headerName) => {
        // Squash duplicate headers down into a single string, not really sure what an array indicates.
        const originalHeader = headers[headerName];
        processedHeaders[headerName] = Array.isArray(originalHeader) ? originalHeader.join(",") : originalHeader;

        // @todo, filter headers?
    });

    return processedHeaders;
}
