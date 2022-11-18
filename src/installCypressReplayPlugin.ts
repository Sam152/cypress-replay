import * as Cypress from "cypress";
import * as fs from "fs";

export default function installCypressReplayPlugin(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): void {
    on('task', {
        'cypress-replay:dump-file'(arg) {
            fs.writeSync(fs.openSync('test.json', 'w'), JSON.stringify(arg));
            return null;
        }
    });
}
