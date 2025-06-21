
import { Type } from "@angular/core";
import { createDebugLogger } from "@orion76/debug-logger";
import { IPluginDefinition } from "@orion76/plugin";
import { DEBUG_LOGGER_PREFIX } from "../constants";
import { getPluginsStore } from "../plugins-store";
import { extractObjectProperties } from "../utils";


const debug = createDebugLogger({
    enabled: false,
    id: 'plugin-decorator',
    label: DEBUG_LOGGER_PREFIX + '[Decorator]'
});

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

        debug('Add plugin definition: \n\ttype: {{type}}, \n\tid: {{id}} \n\t{{label}}\n', () => extractObjectProperties<D>(definition, ['type', 'id', 'label']));

        const pluginStore = getPluginsStore().getPluginType(type);

        definition.pluginClass = pluginClass;
        pluginStore.addPluginDefinition(definition);

        return pluginClass;
    }
}