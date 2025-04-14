
import { createDebugLogger, fprint } from "../utils/debug-logger-factory";
import { PluginTypeStore } from "./plugin-type-store";
import { IPluginsStore, IPluginTypeStore } from "./types";


const DEBUG = false;
const debug = createDebugLogger(DEBUG, '[PluginsStore]',fprint);


class PluginsStore implements IPluginsStore {
    private _store = new Map<string, IPluginTypeStore>();

    getPluginType(pluginType: string): IPluginTypeStore {
        if (!this.hasPluginType(pluginType)) {
            this._store.set(pluginType, new PluginTypeStore(pluginType));

            debug('add plugin type: %0', [pluginType]);
        }
        return this._store.get(pluginType)!;
    }

    hasPluginType(pluginType: string): boolean {
        return this._store.has(pluginType);
    }
}

const pluginTypesStore = new PluginsStore();

export function getPluginsStore(): IPluginsStore {
    return pluginTypesStore;
}
