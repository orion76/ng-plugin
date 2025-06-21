import { IPluginDefinition, PluginBase } from "@orion76/plugin";
import { PLUGIN_DEFINITION } from "../injection-tokens";
import { inject } from "@angular/core";

export abstract class NgPluginBase<D extends IPluginDefinition = IPluginDefinition> extends PluginBase {
    definition: D = inject<D>(PLUGIN_DEFINITION);
}