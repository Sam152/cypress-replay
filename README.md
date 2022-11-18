Cypress Replay
===

Records requests made to your services in Cypress tests and stores them in fixture files for replay on CI.
Inspired by projects such as [cypress-autorecord](https://github.com/Nanciee/cypress-autorecord), [cypressautomocker](https://github.com/scottschafer/cypressautomocker) and [cypress-autostub](https://github.com/dan-cooke/cypress-autostub).  

# Installing

Add the following configuration line to your `cypress.config.ts` file:

```
export default defineConfig({
  // @ts-ignore
  cypressReplay: {
    interceptPattern: ".*",
    dynamicRequestEnvComponents: [],
  }
});
```

Add the following to the body of each test you wish to use the replay functionality with:

```
context('Test something', () => {
    enableCypressReplay();

    it('should work correctly', () => {
        ...
```

# Configuration options

```
/**
 * This 
 */
interceptPattern: "jsonplaceholder\.cypress\.io",

/**
 * 
 */
dynamicRequestEnvComponents: ["REACT_APP_AUTH_URL", "REACT_APP_CMS_URL", "REACT_APP_CROWDML_URL", "REACT_APP_DPA_URL"],
```

# Choosing the mode (recording or replaying)

There are two ways to specify if the plugin should be recording or replaying:

* Passing an environment variable while starting the cypress runner: `CYPRESS_REPLAY_RECORD_REQUESTS=1 yarn run cy`
* Passing an argument to `enableCypressReplay`: `enableCypressReplay(ReplayMode.Recording | ReplayMode.Replaying)` 
