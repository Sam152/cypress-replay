export default async function waitForIdle(requests: Set<Promise<any>>) {
    for (const request of requests) {
        await request
    }
}
