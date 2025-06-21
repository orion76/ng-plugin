import { IPluginDefinition, PluginException } from "@orion76/plugin";
import { IPluginTypeStore } from "./types";

export class PluginTypeStore implements IPluginTypeStore {
    private _definitions: IPluginDefinition[] = [];

    constructor(public readonly type: string) {

    }
    getDefinitions() {
        return this._definitions;
    }

    addPluginDefinition(definition: IPluginDefinition) {
        const { _definitions } = this;

        if (_definitions.findIndex((item) => item.id === definition.id) > -1) {
            const { id, type } = definition;
            throw new PluginException(type, id, 'Plugin definition already exsists');
        }

        const definitionClone: IPluginDefinition = { ...definition };
        _definitions.push(definitionClone);
    }
}