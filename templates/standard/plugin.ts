import { IPlugin, IPluginDefinition, PluginBase } from '@orion76/plugin';
import { Plugin } from '../../src/decorators/plugin.decorator'
import { IPluginTemplate } from './types';
import { PLUGIN_DEFINITION } from '../../src/injection-tokens';
import { inject } from '@angular/core';

export const PLUGIN_TEMPLATE_PLUGIN_TYPE = 'PLUGIN_TEMPLATE_PLUGIN_TYPE';

export const PLUGIN_TEMPMLATE = 'PLUGIN_TEMPMLATE'

@Plugin({
    label: 'PLUGIN_TEMPMLATE',
    type: PLUGIN_TEMPLATE_PLUGIN_TYPE,
    id: PLUGIN_TEMPMLATE
})
export class PluginTemplate extends PluginBase implements IPluginTemplate {
    private _definition = inject(PLUGIN_DEFINITION)
    override get definition(): IPluginDefinition<IPlugin> {
        return this._definition
    }


}