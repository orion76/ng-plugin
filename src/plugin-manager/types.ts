import { IPlugin, IPluginBuilder, IPluginDiscovery, IPluginManager } from "@orion76/plugin";
import { Type } from '@angular/core';

export interface IPluginManagerFactoryOptions<P extends IPlugin> {
    pluginManagerCls?: Type<IPluginManager<P>>,
    pluginDiscoveryCls?: Type<IPluginDiscovery>,
    pluginDiscoveryDecoratorCls?: Type<IPluginDiscovery>,
    pluginBuilderCls?: Type<IPluginBuilder>
}