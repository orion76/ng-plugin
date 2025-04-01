
import { Type } from "@angular/core";
import { IPluginDefinition } from "@orion76/plugin";
import { getPluginsStore } from "../plugins-store";
import { createDebugLogger } from "../utils/debug-logger-factory";




const DEBUG = false;
const debug = createDebugLogger(DEBUG, '+++[Plugin-decorator]');

/**
 * Injectable decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export function Plugin<D extends IPluginDefinition = IPluginDefinition>(definition: D) {
    return (pluginClass: Type<any>) => {
        if (definition.disabled) {
            return;
        }
        if (DEBUG) {
            const { type, id, label } = definition;
            debug('Add plugin definition', { type, id, label });
        }

        const { type } = definition;

        const pluginStore = getPluginsStore().getPluginType(type);

        definition.pluginClass = pluginClass;
        pluginStore.addPluginDefinition(definition);

        return pluginClass;
    }
}