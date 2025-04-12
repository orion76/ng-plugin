import { inject } from '@angular/core';
import { IPluginDefinition, PluginDiscoveryBase } from '@orion76/plugin';
import { PLUGIN_DEFINITION_COLLECTION, PLUGIN_TYPE } from '../injection-tokens';

export class PluginDiscoveryDefault extends PluginDiscoveryBase {
  override readonly pluginType = inject(PLUGIN_TYPE);
  private _definitions = inject<IPluginDefinition[]>(PLUGIN_DEFINITION_COLLECTION);

  protected get definitions(): IPluginDefinition[] {
    return this._definitions;
  }
}
