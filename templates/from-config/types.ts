import { IPlugin, IPluginDefinition } from "@orion76/plugin";


export interface IPluginTemplate extends IPlugin{

}

export interface IPluginTemplateConfig {
    id: string;
    label: string;
}

export type TPluginTemplateDefinition = IPluginDefinition<IPluginTemplate> 