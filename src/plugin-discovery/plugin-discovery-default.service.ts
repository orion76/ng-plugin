import { inject } from '@angular/core';
import { IPluginDefinition, PluginDiscoveryBase } from '@orion76/plugin';
import { PLUGIN_DEFINITION_COLLECTION } from '../injection-tokens';

export class PluginDiscoveryDefault extends PluginDiscoveryBase {
  private _definitions = inject<IPluginDefinition[]>(PLUGIN_DEFINITION_COLLECTION);
  
  protected get definitions(): IPluginDefinition[] {
    return this._definitions;
  }
}
