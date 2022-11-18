export type ReplayConfig = {
    interceptPattern: string,
    dynamicRequestEnvComponents?: Array<string>,
};

export enum ReplayMode {
    Recording,
    Replaying
}
