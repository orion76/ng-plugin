import { InjectionToken } from "@angular/core";
import { IPluginBuilder, IPluginDefinition, IPluginDiscovery, IPluginManager } from "@orion76/plugin";


export const PLUGIN_DEFINITION_COLLECTION = new InjectionToken<IPluginDefinition[]>('PLUGIN_DEFINITION_COLLECTION');
export const PLUGIN_DEFINITION = new InjectionToken<IPluginDefinition>('PLUGIN_DEFINITION');
export const PLUGIN_TYPE = new InjectionToken<string>('PLUGIN_TYPE');
export const PLUGIN_MANAGER = new InjectionToken<IPluginManager>('PLUGIN_MANAGER');
export const PLUGIN_DISCOVERY = new InjectionToken<IPluginDiscovery>('PLUGIN_DISCOVERY');
export const PLUGIN_BUILDER = new InjectionToken<IPluginBuilder>('PLUGIN_BUILDER');
export const PLUGIN_INSTANCE = new InjectionToken<unknown>('PLUGIN_INSTANCE');

