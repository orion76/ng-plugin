import { inject, InjectionToken, Injector, Provider, Type } from "@angular/core";
import { IPlugin, IPluginBuilder, IPluginDiscovery, IPluginManager } from "@orion76/plugin";
import { PLUGIN_BUILDER, PLUGIN_DEFINITION_COLLECTION, PLUGIN_DISCOVERY, PLUGIN_MANAGER, PLUGIN_TYPE } from "../injection-tokens";

import { PluginManagerDefault } from "./plugin-manager-default.service";
import { PluginBuilderDefault } from "../plugin-builder/plugin-builder-default.service";
import { createPluginManagerInjectionTokenDescription, getPluginsStore } from "../plugins-store";
import { PluginDiscoveryDefault } from "../plugin-discovery/plugin-discovery-default.service";



export function createPluginManagerToken<P extends IPlugin>(
    pluginType: string,
    pluginManagerCls?: Type<IPluginManager<P>>,
    pluginDiscoveryCls?: Type<IPluginDiscovery>,
    pluginBuilderCls?: Type<IPluginBuilder>,
) {

    const _pluginManagerCls = pluginManagerCls ?? PluginManagerDefault;
    const _pluginDiscoveryCls = pluginDiscoveryCls ?? PluginDiscoveryDefault;
    const _pluginBuiilderCls = pluginBuilderCls ?? PluginBuilderDefault;

    return new InjectionToken(createPluginManagerInjectionTokenDescription(pluginType), {
        providedIn: 'root',
        factory: pluginManagerDefaultFactory(pluginType, _pluginManagerCls, _pluginDiscoveryCls, _pluginBuiilderCls),
    })
}

function pluginManagerDefaultFactory(
    pluginType: string,
    pluginManagerCls: Type<IPluginManager>,
    pluginDiscoveryCls: Type<IPluginDiscovery>,
    pluginBuilderCls: Type<IPluginBuilder>,
) {
    return () => {



        const providers: Provider[] = [
            { provide: PLUGIN_TYPE, useValue: pluginType },
            { provide: PLUGIN_DISCOVERY, useClass: pluginDiscoveryCls },
            { provide: PLUGIN_BUILDER, useClass: pluginBuilderCls },
            { provide: PLUGIN_MANAGER, useClass: pluginManagerCls },
        ]

        if (pluginDiscoveryCls === PluginDiscoveryDefault) {
            const definitions = getPluginsStore().getPluginType(pluginType).getDefinitions();
            if (definitions.length === 0) {
                throw new Error(`Plugin type: ${pluginType}. Definitions is missing.`)
            }

            providers.push({ provide: PLUGIN_DEFINITION_COLLECTION, useValue: definitions })
        }

        const parent = inject(Injector)
        const injector = Injector.create({ providers, parent })

        return injector.get(PLUGIN_MANAGER);
    }
}
