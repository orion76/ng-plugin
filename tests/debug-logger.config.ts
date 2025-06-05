import { debugLoggerUsedReport, ILoggerInstanceConfig, initStore, setGlobalConfig } from "@orion76/debug-logger";

export const loggerConfigInstances: ILoggerInstanceConfig[] = [
    { id: 'plugin-type-store', enabled: false },
    { id: 'plugin-store', enabled: false },
    { id: 'plugin-decorator', enabled: false },
    { id: 'crete-plugin-manager-token', enabled: false },
]

initStore();
setGlobalConfig({ instances: loggerConfigInstances });
debugLoggerUsedReport();