
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

        const { pluginType } = definition;

        debug('Add plugin definition', () => {
            const { pluginType, id, label } = definition;
            return { pluginType, id, label };
        });

        const pluginStore = getPluginsStore().getPluginType(pluginType);

        definition.pluginClass = pluginClass;
        pluginStore.addPluginDefinition(definition);

        return pluginClass;
    }
}