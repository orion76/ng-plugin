import { inject, InjectionToken } from "@angular/core";

import { IPluginDiscovery, PluginDiscoveryBase } from "@orion76/plugin";
import { PLUGIN_TEMPLATE__PLUGIN_TYPE, TemplatePlugin } from "./plugin";
import { IPluginTemplateConfig, TPluginTemplateDefinition } from "./types";

const PLUGIN_TYPE_CONFIGS = 'PLUGIN_TYPE_CONFIGS';
const PLUGIN_TYPE_CONFIGS_TOKEN = new InjectionToken<IPluginTemplateConfig[]>(PLUGIN_TYPE_CONFIGS);

function createLoggerDefinition(config: IPluginTemplateConfig): TPluginTemplateDefinition {
    return { ...config, type: PLUGIN_TEMPLATE__PLUGIN_TYPE, pluginClass: TemplatePlugin }
}

export class PluginExampleDiscovery extends PluginDiscoveryBase implements IPluginDiscovery {
    override type = PLUGIN_TYPE_CONFIGS;
    protected definitions: TPluginTemplateDefinition[] = inject(PLUGIN_TYPE_CONFIGS_TOKEN).map(createLoggerDefinition);
}