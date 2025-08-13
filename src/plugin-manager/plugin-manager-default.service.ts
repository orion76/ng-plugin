import { inject } from '@angular/core';

import { PLUGIN_BUILDER, PLUGIN_DISCOVERY_DECORATOR, PLUGIN_TYPE } from '../injection-tokens';
import { IPlugin, PluginManagerBase, IPluginBuilder, IPluginDiscovery } from '@orion76/plugin';


export class PluginManagerDefault<P extends IPlugin = IPlugin> extends PluginManagerBase<P> {
  type = inject(PLUGIN_TYPE);
  protected pluginBuilder = inject<IPluginBuilder<P>>(PLUGIN_BUILDER);
  protected pluginDiscovery = inject<IPluginDiscovery>(PLUGIN_DISCOVERY_DECORATOR);
}
