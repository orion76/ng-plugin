import { IPluginDefinition } from "@gpb/plugin";

export interface IPluginTemplate {

}

export interface IPluginTemplateConfig {
    id: string;
    label: string;
}

export type TPluginTemplateDefinition = IPluginDefinition<IPluginTemplateConfig> 