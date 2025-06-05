import { createDebugLogger } from "@orion76/debug-logger";
import { IPluginDefinition, PluginException } from "@orion76/plugin";
import { DEBUG_LOGGER_PREFIX } from "../constants";
import { IPluginTypeStore } from "./types";

const debug = createDebugLogger({
    enabled: false,
    id: 'plugin-type-store',
    label: DEBUG_LOGGER_PREFIX + '[PluginTypeStore]',
});
export class PluginTypeStore implements IPluginTypeStore {
    private _definitions: IPluginDefinition[] = [];

    constructor(public readonly type: string) {

    }
    getDefinitions() {
        return this._definitions;
    }

    addPluginDefinition(definition: IPluginDefinition) {
        debug('addPluginDefinition: {{type}}', definition);

        const { _definitions } = this;

        if (_definitions.findIndex((item) => item.id === definition.id) > -1) {
            const { id, type } = definition;
            throw new PluginException(type, id, 'Plugin definition already exsists');
        }

        const definitionClone: IPluginDefinition = { ...definition };
        _definitions.push(definitionClone);
    }
}