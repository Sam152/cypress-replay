const badHeaders = ["content-encoding"];

export default function sanitizeHeaders(headers: { [key: string]: string | string[] }): { [key: string]: string } {
    const processedHeaders: { [key: string]: string } = {};

    Object.keys(headers).forEach((headerName) => {
        // Drop some headers.
        if (badHeaders.includes(headerName)) {
            return;
        }

        // Squash duplicate headers down into a single string, not really sure what an array indicates?
        const originalHeader = headers[headerName];
        processedHeaders[headerName] = Array.isArray(originalHeader) ? originalHeader.join(",") : originalHeader;
    });

    return processedHeaders;
}
