import { inject } from '@angular/core';
import { IPlugin, IPluginBuilder, IPluginDiscovery, PluginManagerBase } from '@orion76/plugin;
import { PLUGIN_BUILDER, PLUGIN_DISCOVERY, PLUGIN_TYPE } from '../injection-tokens';


export class PluginManagerDefault<P extends IPlugin = IPlugin> extends PluginManagerBase<P> {
  pluginType = inject(PLUGIN_TYPE);
  protected pluginBuilder = inject<IPluginBuilder>(PLUGIN_BUILDER);
  protected pluginDiscovery = inject<IPluginDiscovery>(PLUGIN_DISCOVERY);
}
