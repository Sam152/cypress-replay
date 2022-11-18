Cypress Replay
===

Record things happening in a Cypress test and replay them on CI.

# Installing

Add the following line to your `cypress.config.ts` file:

```
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      installCypressReplayPlugin(on, config); // This line will install the plugin.
    },
  },
```

Add the following to each one your tests you wish to use cypress replay:

```
context('Test something', () => {
    enableCypressReplay();

    it('should work correctly', () => {
        ...
```

# Configuring

Add the following lines to your `cypress.config.ts` file to configure the plugin:

```
export default defineConfig({
  ...

  cypressReplay: {

    /**
     * This 
     */
    interceptPattern: "jsonplaceholder\.cypress\.io",

    /**
     * 
     */
    serviceEnvVars: ["REACT_APP_AUTH_URL", "REACT_APP_CMS_URL", "REACT_APP_CROWDML_URL", "REACT_APP_DPA_URL"],
  }
});
```

# Choosing the mode (recording or replaying)

There are two ways to specify if the plugin should be recording or replaying:

* Passing an environment variable while starting the cypress runner: `CYPRESS_REPLAY_RECORD_REQUESTS=1 yarn run cy`
* Passing an argument to `enableCypressReplay`: `enableCypressReplay(ReplayMode.Recording | ReplayMode.Replaying)` 
* 