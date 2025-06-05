import { debugLoggerUsedReport, IDebugLoggerConfig, ILoggerInstanceConfig, setGlobalConfig } from "@orion76/debug-logger";



export function createInstanceConfig(id: string, enabled: boolean): ILoggerInstanceConfig {
    return {
        id,
        label: `Label ${id}`,
        enabled,
    }
}

export function initGlobalConfig(instances: ILoggerInstanceConfig[], disabled?: boolean,) {
    const globalConfig: IDebugLoggerConfig = { instances, disabled };
    setGlobalConfig(globalConfig);
    debugLoggerUsedReport();
}