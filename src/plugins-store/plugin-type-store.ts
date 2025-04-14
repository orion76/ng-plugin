import { IPluginDefinition, PluginException } from "@orion76/plugin";
import { IPluginTypeStore } from "./types";
import { createDebugLogger, fprint } from "../utils/debug-logger-factory";


const DEBUG = false;
const debug = createDebugLogger(DEBUG, '[PluginTypeStore]', fprint);

export class PluginTypeStore implements IPluginTypeStore {
    private _definitions: IPluginDefinition[] = [];

    constructor(public readonly pluginType: string) {

    }
    getDefinitions() {
        return this._definitions;
    }

    addPluginDefinition(definition: IPluginDefinition) {
        debug('addPluginDefinition: %0', [definition]);

        const { _definitions } = this;

        if (_definitions.findIndex((item) => item.id === definition.id) > -1) {
            const { id, pluginType } = definition;
            throw new PluginException(pluginType, id, 'Plugin definition already exsists');
        }

        const definitionClone: IPluginDefinition = { ...definition };
        _definitions.push(definitionClone);
    }
}