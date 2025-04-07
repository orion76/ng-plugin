import { Type } from '@angular/core';
import { Plugin } from "../src/decorators/plugin.decorator";
export const PLUGIN_TYPE_TEST = 'PLUGIN_TYPE_TEST'


@Plugin({
    id: 'PLUGIN_TEST_ONE_ID',
    type: PLUGIN_TYPE_TEST,
    label: 'PLUGIN TEST ONE'
})
class PluginTestOne {
}

@Plugin({
    id: 'PLUGIN_TEST_TWO_ID',
    type: PLUGIN_TYPE_TEST,
    label: 'PLUGIN TEST TWO'
})
class PluginTestTwo {

}
@Plugin({
    id: 'PLUGIN_TEST_THREE_ID',
    type: PLUGIN_TYPE_TEST,
    label: 'PLUGIN TEST THREE'
})
class PluginTestThree {

}

export const TEST_PLUGINS_DATA: { id: string, cls: Type<any> }[] = [
    { id: 'PLUGIN_TEST_ONE_ID', cls: PluginTestOne },
    { id: 'PLUGIN_TEST_TWO_ID', cls: PluginTestTwo },
    { id: 'PLUGIN_TEST_THREE_ID', cls: PluginTestThree }
];