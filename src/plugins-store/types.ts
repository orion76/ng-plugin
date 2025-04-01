import { Injector, Type } from "@angular/core";
import { IPluginDefinition, IPluginManager } from "@orion76/plugin";


export interface IPluginManagerMetadata {
    cls: Type<IPluginManager>
}


export interface IPluginTypeMetadata {
    pluginType: string;
    // manager: IPluginManagerMetadata;
    injector?: Injector;
    definitions: IPluginDefinition[];
}


export interface IPluginsStore {
    getPluginType(pluginType: string): IPluginTypeStore;
    hasPluginType(pluginType: string): boolean;
}
export interface IPluginTypeStore {
    readonly pluginType: string;
    addPluginDefinition(definition: IPluginDefinition): void;
    getDefinitions(): IPluginDefinition[];
}
