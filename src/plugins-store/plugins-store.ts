
import { createDebugLogger } from "../utils/debug-logger-factory";
import { PluginTypeStore } from "./plugin-type-store";
import { IPluginsStore, IPluginTypeStore } from "./types";


const DEBUG = false;
const debug = createDebugLogger(DEBUG, '[PluginsStore]');


class PluginsStore implements IPluginsStore {
    private _store = new Map<string, IPluginTypeStore>();

    getPluginType(pluginType: string): IPluginTypeStore {
        if (!this.hasPluginType(pluginType)) {
            this._store.set(pluginType, new PluginTypeStore(pluginType));

            debug('add plugin type', pluginType);
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
