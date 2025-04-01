import { IPluginDefinition } from "@orion76/plugin";


export interface IPluginTemplate extends IPluginDefinition{

}

export interface IPluginTemplateConfig {
    id: string;
    label: string;
}

export type TPluginTemplateDefinition = IPluginDefinition<IPluginTemplateConfig> 