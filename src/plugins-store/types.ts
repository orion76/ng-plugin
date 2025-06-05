import { Injector, Type } from "@angular/core";
import { IPluginDefinition, IPluginManager } from "@orion76/plugin";


export interface IPluginManagerMetadata {
    cls: Type<IPluginManager>
}


export interface IPluginTypeMetadata {
    type: string;
    // manager: IPluginManagerMetadata;
    injector?: Injector;
    definitions: IPluginDefinition[];
}


export interface IPluginsStore {
    getPluginType(type: string): IPluginTypeStore;
    hasPluginType(type: string): boolean;
}
export interface IPluginTypeStore {
    readonly type: string;
    addPluginDefinition(definition: IPluginDefinition): void;
    getDefinitions(): IPluginDefinition[];
}
