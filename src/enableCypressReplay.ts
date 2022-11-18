import {ReplayMode} from "./index";
import recordRequests from "./record/recordRequests";
import replayRequests from "./replay/replayRequests";

export default function enableCypressReplay(mode: ReplayMode | undefined) {
    const replayMode = mode !== undefined ? mode : (Cypress.env('REPLAY_RECORD_REQUESTS') ? ReplayMode.Recording : ReplayMode.Replaying);

    if (replayMode === ReplayMode.Recording) {
        recordRequests();
    }
    if (replayMode === ReplayMode.Replaying) {
        replayRequests();
    }
}
