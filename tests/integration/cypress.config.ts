import { defineConfig } from "cypress";
import installCypressReplayPlugin from "../../src/installCypressReplayPlugin";


export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      installCypressReplayPlugin(on, config);
    },
  },

  // @ts-ignore
  cypressReplay: {
    interceptPattern: "jsonplaceholder\.cypress\.io",
    serviceEnvVars: ["REACT_APP_AUTH_URL", "REACT_APP_CMS_URL", "REACT_APP_CROWDML_URL", "REACT_APP_DPA_URL"],
  }
});
