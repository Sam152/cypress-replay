import {ReplayConfig} from "../index";

export default function loadConfiguration(): ReplayConfig {
    return (Cypress.config() as any as Cypress.ConfigOptions & {cypressReplay: ReplayConfig}).cypressReplay;
}
