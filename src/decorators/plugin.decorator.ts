
import { Type } from "@angular/core";
import { IPluginDefinition } from "@orion76/plugin";
import { getPluginsStore } from "../plugins-store";
import { extractObjectProperties } from "../utils";


/**
 * Injectable decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export function Plugin<D extends IPluginDefinition = IPluginDefinition>(definition: D) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (pluginClass: Type<any>) => {
        if (definition.disabled) {
            return;
        }

        const { type } = definition;
        const pluginStore = getPluginsStore().getPluginType(type);

        definition.pluginClass = pluginClass;
        pluginStore.addPluginDefinition(definition);

        return pluginClass;
    }
}