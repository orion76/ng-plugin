import { inject, InjectionToken } from "@angular/core";
import { IPluginDefinition, IPluginDiscovery } from "@gpb/plugin";
import { TemplatePlugin, PLUGIN_TEMPLATE__PLUGIN_TYPE } from "./plugin";
import { IPluginTemplateConfig } from "./types";


const PLUGIN_TYPE_CONFIGS_TOKEN = new InjectionToken<IPluginTemplateConfig[]>('PLUGIN_TYPE_CONFIGS_TOKEN');

function createLoggerDefinition(config: IPluginTemplateConfig): IPluginDefinition<IPluginTemplateConfig> {
    const { id, label } = config;
    return {
        pluginType: PLUGIN_TEMPLATE__PLUGIN_TYPE,
        id,
        label,
        data: config,
        cls: TemplatePlugin
    }
}

export class PluginExampleDiscovery implements IPluginDiscovery<IPluginTemplateConfig> {
    private _definitions: IPluginDefinition<IPluginTemplateConfig>[] = inject(PLUGIN_TYPE_CONFIGS_TOKEN).map(createLoggerDefinition);

    getDefinitions(): IPluginDefinition<IPluginTemplateConfig>[] {
        return this._definitions;
    }
}