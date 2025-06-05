

import { createDebugLogger } from "@orion76/debug-logger";
import { DEBUG_LOGGER_PREFIX } from "../constants";
import { PluginTypeStore } from "./plugin-type-store";
import { IPluginsStore, IPluginTypeStore } from "./types";

const debug = createDebugLogger({
    enabled: false,
    id: 'plugin-store',
    label: DEBUG_LOGGER_PREFIX + '[PluginsStore]',
});

class PluginsStore implements IPluginsStore {
    private _store = new Map<string, IPluginTypeStore>();

    getPluginType(type: string): IPluginTypeStore {
        if (!this.hasPluginType(type)) {
            this._store.set(type, new PluginTypeStore(type));

            debug('add plugin type: {{type}}', {type});
        }
        return this._store.get(type)!;
    }

    hasPluginType(type: string): boolean {
        return this._store.has(type);
    }
}

const pluginTypesStore = new PluginsStore();

export function getPluginsStore(): IPluginsStore {
    return pluginTypesStore;
}
