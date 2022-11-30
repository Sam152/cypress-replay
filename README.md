Cypress Replay
===

Records requests made to your services in Cypress tests and stores them in fixture files for replay on CI.
Inspired by projects such as [cypress-autorecord](https://github.com/Nanciee/cypress-autorecord), [cypressautomocker](https://github.com/scottschafer/cypressautomocker) and [cypress-autostub](https://github.com/dan-cooke/cypress-autostub).

Compatible with Cypress 6+ (tested on Cypress 11).

## Installing

```
yarn add --dev cypress-replay
npm install --save-dev cypress-replay
```

Add the following configuration line to your `cypress.config.ts` file:

```
export default defineConfig({
  // @ts-ignore
  cypressReplay: {
    interceptPattern: ".*",
  }
});
```

Add the following to the body of each test you wish to use the replay functionality with:

```
import enableCypressReplay from "cypress-replay";

context('Test something', () => {
    enableCypressReplay();

    it('should work correctly', () => {
        ...
```

## Configuration options

Configuration can either be set globally (in the `cypress.config.ts` file as above), or be passed in to the
`enableCypressReplay` function, used to enable the replay functionality. Each configuration option is optional and
documented below:

```
/**
 * A Regex that matches all the endpoints you intend to record and replay.
 */
interceptPattern: "jsonplaceholder\.cypress\.io|some-other-endpoint\.com",

/**
 * A list of environment variables that should be substituted in your replay
 * files - this is helpful if your API endpoints are defined with environment
 * variables and you would like a deterministic replay, regardless of how each
 * is configured.
 */
dynamicRequestEnvComponents: ["REACT_APP_MY_API_ENDPOINT"],

/**
 * To ensure tests are deterministic, the time taken for each request during
 * recording is used as a delay when replaying. For some applications, replaying
 * with an accurate delay may not matter and it's preferable for tests to run as
 * fast as possible. In this case, you may specify an override (with 0 being
 * instant) for how long a response is delayed during a replay.  
 */
responseDelayOverride: 20,
```

## Choosing the mode (recording or replaying)

There are two ways to specify if the plugin should be recording or replaying:

* Passing an environment variable while starting the cypress runner: `CYPRESS_REPLAY_RECORD_REQUESTS=1 yarn run cy`
* Passing an argument to `enableCypressReplay`:
```
enableCypressReplay() // Uses the "CYPRESS_REPLAY_RECORD_REQUESTS" variable or defaults to "Replaying".
enableCypressReplay(ReplayMode.Recording) // Enforces "Recording" mode.
enableCypressReplay(ReplayMode.Replaying) // Enforces "Replaying" mode.
```

## Best practices

I find it useful to create scripts that setup the state of your API services for recording. This might be installing a
standard set of test content or creating certain pre-conditions in your application. By doing this, you can easily
rerecord each test as your client code changes the requests it makes to your services.
