import { IPluginDefinition, IPlugin, PluginBase } from "@orion76/plugin";
import { IPluginTemplate, TPluginTemplateDefinition } from "./types";

export const PLUGIN_TEMPLATE__PLUGIN_TYPE = 'PLUGIN_TEMPLATE__PLUGIN_TYPE';


export class TemplatePlugin extends PluginBase implements IPluginTemplate {
    constructor(private _definition: TPluginTemplateDefinition) {
        super();
    }
    override get definition(): IPluginDefinition<IPlugin> {
        return this._definition
    }

}