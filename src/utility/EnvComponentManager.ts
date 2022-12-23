export default class EnvComponentManager {
    private dynamicEnvMap: { [key: string]: string };

    constructor(dynamicEnvMap: { [key: string]: string }) {
        this.dynamicEnvMap = dynamicEnvMap;
    }

    static fromEnvironment(envVars: string[], envResolver: (key: string) => string): EnvComponentManager {
        const map: { [key: string]: string } = {};
        envVars.forEach((envVar) => {
            map[envVar] = envResolver(envVar);
        });
        return new EnvComponentManager(map);
    }

    removeDynamicComponents(input: string) {
        Object.keys(this.dynamicEnvMap).forEach((envVarName) => {
            input = input.replace(this.dynamicEnvMap[envVarName], `{${envVarName}}`);
        });
        return input;
    }

    insertDynamicComponents(input: string) {
        Object.keys(this.dynamicEnvMap).forEach((envVarName) => {
            input = input.replace(`{${envVarName}}`, this.dynamicEnvMap[envVarName]);
        });
        return input;
    }
}
