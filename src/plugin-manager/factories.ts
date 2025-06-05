import { inject, InjectionToken, Injector, Provider, ProviderToken, Type } from "@angular/core";
import { IPlugin, IPluginBuilder, IPluginDiscovery, IPluginManager, PluginTypeException } from "@orion76/plugin";
import { PLUGIN_BUILDER, PLUGIN_DEFINITION_COLLECTION, PLUGIN_DISCOVERY, PLUGIN_DISCOVERY_DECORATED, PLUGIN_MANAGER, PLUGIN_TYPE } from "../injection-tokens";

import { PluginBuilderDefault } from "../plugin-builder/plugin-builder-default.service";
import { PluginDiscoveryDefault } from "../plugin-discovery/plugin-discovery-default.service";
import { getPluginsStore } from "../plugins-store";

import { createDebugLogger } from "@orion76/debug-logger";
import { DEBUG_LOGGER_PREFIX } from "../constants";
import { PluginDiscoveryDecoratorDefault } from "../plugin-discovery/plugin-discovery-decorator-default.service";
import { PluginManagerDefault } from "./plugin-manager-default.service";

type TInject = <T>(token: ProviderToken<T>) => T

export function createPluginManagerInjectionTokenDescription(type: string) {
    return `${type}__PLUGIN_MANAGER`;
}

const debug = createDebugLogger({
    enabled: false,
    id: 'crete-plugin-manager-token',
    label: DEBUG_LOGGER_PREFIX + '[createPluginManagerToken]'
});


export function createPluginManagerTokenFactory<P extends IPlugin>(
    type: string,
    pluginManagerCls?: Type<IPluginManager<P>>,
    pluginDiscoveryCls?: Type<IPluginDiscovery>,
    pluginBuilderCls?: Type<IPluginBuilder>
): () => IPluginManager<P> {

    const _pluginManagerCls = pluginManagerCls ?? PluginManagerDefault;
    const _pluginDiscoveryCls = pluginDiscoveryCls ?? PluginDiscoveryDefault;
    const _pluginBuiilderCls = pluginBuilderCls ?? PluginBuilderDefault;

    return pluginManagerDefaultFactory(type, _pluginManagerCls, _pluginDiscoveryCls, _pluginBuiilderCls)
}

export function createPluginManagerToken<P extends IPlugin>(
    type: string,
    pluginManagerCls?: Type<IPluginManager<P>>,
    pluginDiscoveryCls?: Type<IPluginDiscovery>,
    pluginBuilderCls?: Type<IPluginBuilder>,
) {
    debug('createPluginManagerToken(): {{type}}', { type });

    return new InjectionToken(createPluginManagerInjectionTokenDescription(type), {
        providedIn: 'root',
        factory: createPluginManagerTokenFactory(type, pluginManagerCls, pluginDiscoveryCls, pluginBuilderCls),
    })
}

function pluginManagerDefaultFactory<P extends IPlugin>(
    type: string,
    pluginManagerCls: Type<IPluginManager<P>>,
    pluginDiscoveryCls: Type<IPluginDiscovery>,
    pluginBuilderCls: Type<IPluginBuilder>
): () => IPluginManager<P> {
    return () => {
        debug('Creaete PluginManager: {{type}}', { type });
        const providers: Provider[] = [
            { provide: PLUGIN_TYPE, useValue: type },
            { provide: PLUGIN_DISCOVERY_DECORATED, useClass: pluginDiscoveryCls },
            { provide: PLUGIN_DISCOVERY, useClass: PluginDiscoveryDecoratorDefault },
            { provide: PLUGIN_BUILDER, useClass: pluginBuilderCls },
            { provide: PLUGIN_MANAGER, useClass: pluginManagerCls },
        ];

        if (pluginDiscoveryCls === PluginDiscoveryDefault) {
            const definitions = getPluginsStore().getPluginType(type).getDefinitions();
            if (definitions.length === 0) {
                throw new PluginTypeException(type, `Definitions is missing.`)
            }

            providers.push({ provide: PLUGIN_DEFINITION_COLLECTION, useValue: definitions })
        }
        const parent = inject(Injector)
        const injector = Injector.create({ providers, parent })

        return injector.get<IPluginManager<P>>(PLUGIN_MANAGER);
    }
}
