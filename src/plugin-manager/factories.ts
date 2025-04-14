import { inject, InjectionToken, Injector, Provider, Type } from "@angular/core";
import { IPlugin, IPluginBuilder, IPluginDiscovery, IPluginManager, PluginTypeException } from "@orion76/plugin";
import { PLUGIN_BUILDER, PLUGIN_DEFINITION_COLLECTION, PLUGIN_DISCOVERY, PLUGIN_DISCOVERY_DECORATED, PLUGIN_MANAGER, PLUGIN_TYPE } from "../injection-tokens";

import { PluginBuilderDefault } from "../plugin-builder/plugin-builder-default.service";
import { PluginDiscoveryDecoratorDefault } from "../plugin-discovery";
import { PluginDiscoveryDefault } from "../plugin-discovery/plugin-discovery-default.service";
import { getPluginsStore } from "../plugins-store";
import { createDebugLogger, fprint } from "../utils/debug-logger-factory";
import { PluginManagerDefault } from "./plugin-manager-default.service";


export function createPluginManagerInjectionTokenDescription(pluginType: string) {
    return `${pluginType}__PLUGIN_MANAGER`;
}

const DEBUG = false;
const debug = createDebugLogger(DEBUG, '[PluginManager Token]', fprint);

export function createPluginManagerToken<P extends IPlugin>(
    pluginType: string,
    pluginManagerCls?: Type<IPluginManager<P>>,
    pluginDiscoveryCls?: Type<IPluginDiscovery>,
    pluginBuilderCls?: Type<IPluginBuilder>,
) {

    const _pluginManagerCls = pluginManagerCls ?? PluginManagerDefault;
    const _pluginDiscoveryCls = pluginDiscoveryCls ?? PluginDiscoveryDefault;
    const _pluginBuiilderCls = pluginBuilderCls ?? PluginBuilderDefault;

    debug('createPluginManagerToken(): %0', [{ pluginType }]);

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
        debug('Creaete PluginManager: %0', [pluginType]);
        const providers: Provider[] = [
            { provide: PLUGIN_TYPE, useValue: pluginType },
            { provide: PLUGIN_DISCOVERY_DECORATED, useClass: pluginDiscoveryCls },
            { provide: PLUGIN_DISCOVERY, useClass: PluginDiscoveryDecoratorDefault },
            { provide: PLUGIN_BUILDER, useClass: pluginBuilderCls },
            { provide: PLUGIN_MANAGER, useClass: pluginManagerCls },
        ];



        if (pluginDiscoveryCls === PluginDiscoveryDefault) {
            const definitions = getPluginsStore().getPluginType(pluginType).getDefinitions();
            if (definitions.length === 0) {
                throw new PluginTypeException(pluginType, `Definitions is missing.`)
            }

            providers.push({ provide: PLUGIN_DEFINITION_COLLECTION, useValue: definitions })
        }
        const parent = inject(Injector)
        const injector = Injector.create({ providers, parent })

        return injector.get(PLUGIN_MANAGER);
    }
}
