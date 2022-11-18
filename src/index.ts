export type ReplayConfig = {
    interceptPattern: string,
    serviceEnvVars: Array<string>,
};

export enum ReplayMode {
    Recording,
    Replaying
}
