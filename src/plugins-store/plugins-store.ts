

import { PluginTypeStore } from "./plugin-type-store";
import { IPluginsStore, IPluginTypeStore } from "./types";

class PluginsStore implements IPluginsStore {
    private _store = new Map<string, IPluginTypeStore>();

    getPluginType(type: string): IPluginTypeStore {
        if (!this.hasPluginType(type)) {
            this._store.set(type, new PluginTypeStore(type));
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
