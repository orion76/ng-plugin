import { inject, InjectionToken } from "@angular/core";

import { TemplatePlugin, PLUGIN_TEMPLATE__PLUGIN_TYPE } from "./plugin";
import { IPluginTemplateConfig, TPluginTemplateDefinition } from "./types";
import { IPluginDefinition, IPluginDiscovery, PluginDiscoveryBase } from "@orion76/plugin";


const PLUGIN_TYPE_CONFIGS_TOKEN = new InjectionToken<IPluginTemplateConfig[]>('PLUGIN_TYPE_CONFIGS_TOKEN');

function createLoggerDefinition(config: IPluginTemplateConfig): TPluginTemplateDefinition {
    return { ...config, type: PLUGIN_TEMPLATE__PLUGIN_TYPE, pluginClass: TemplatePlugin }
}

export class PluginExampleDiscovery extends PluginDiscoveryBase implements IPluginDiscovery {
    protected definitions: TPluginTemplateDefinition[] = inject(PLUGIN_TYPE_CONFIGS_TOKEN).map(createLoggerDefinition);
}