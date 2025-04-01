import { Plugin } from '@gpb/plugin'
import { IPluginTemplate } from './types';

export const PLUGIN_TEMPLATE_PLUGIN_TYPE = 'PLUGIN_TEMPLATE_PLUGIN_TYPE';

export const PLUGIN_TEMPMLATE = 'PLUGIN_TEMPMLATE'

@Plugin({
    pluginType: PLUGIN_TEMPLATE_PLUGIN_TYPE,
    id: PLUGIN_TEMPMLATE
})
export class PluginTemplate implements IPluginTemplate {

}