import { IPlugin, IPluginDefinition } from "@orion76/plugin";
import { PLUGIN_TEMPLATE_PLUGIN_TYPE } from "./plugin";


export interface IPluginTemplate extends IPlugin {

}

export interface IPluginTemplateConfig {

}

export type TPluginTemplateDefinition = { type: typeof PLUGIN_TEMPLATE_PLUGIN_TYPE } & IPluginDefinition<IPluginTemplate> & IPluginTemplateConfig