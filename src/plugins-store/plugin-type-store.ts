import { IPluginDefinition } from "@orion76/plugin";
import { IPluginTypeStore } from "./types";
import { createDebugLogger } from "../utils/debug-logger-factory";


const DEBUG = false;
const debug = createDebugLogger(DEBUG, '[PluginTypeStore]');

export class PluginTypeStore implements IPluginTypeStore {
    private _definitions: IPluginDefinition[] = [];

    constructor(public readonly pluginType: string) {

    }
    getDefinitions() {
        return this._definitions;
    }

    addPluginDefinition(definition: IPluginDefinition) {
        debug('addPluginDefinition', definition);
        const { _definitions } = this;

        if (_definitions.findIndex((item) => item.id === definition.id) > -1) {
            const { id, type } = definition;
            throw new Error(`Plugin definition already exsists. Plugin type: ${type}, plugin ID: ${id}`);
        }

        const definitionClone: IPluginDefinition = { ...definition };
        _definitions.push(definitionClone);
    }
}