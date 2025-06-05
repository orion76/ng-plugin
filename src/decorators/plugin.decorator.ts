
import { Type } from "@angular/core";
import { IPluginDefinition } from "@orion76/plugin";
import { getPluginsStore } from "../plugins-store";
import { createDebugLogger } from "@orion76/debug-logger";
import { extractObjectProperties } from "../utils";
import { DEBUG_LOGGER_PREFIX } from "../constants";




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

// return makeDecorator()


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