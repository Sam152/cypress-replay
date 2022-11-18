import { defineConfig } from "cypress";
import installCypressReplayPlugin from "../src/installCypressReplayPlugin";


export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // installCypressReplayPlugin(on, config);
    },
  },

  // @ts-ignore
  cypressReplay: {
    interceptPattern: "jsonplaceholder\.cypress\.io",
    dynamicRequestEnvComponents: ["API_URL"],
  }
});
