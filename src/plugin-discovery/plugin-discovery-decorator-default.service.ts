import { EnvironmentInjector, inject, Injector, runInInjectionContext } from '@angular/core';
import { IPluginDefinition, IPluginDeriver, IPluginDiscovery, PluginDiscoveryDecorator, PluginException } from '@orion76/plugin';
import { PLUGIN_DISCOVERY_DECORATED, PLUGIN_DERIVER } from '../injection-tokens';



export class PluginDiscoveryDecoratorDefault<
  BasePluginDef extends IPluginDefinition = IPluginDefinition,
  DerivDef extends object = object,
  PluginDef extends BasePluginDef & DerivDef = BasePluginDef & DerivDef
> extends PluginDiscoveryDecorator<BasePluginDef, DerivDef, PluginDef> {

  protected override derivers: Map<string, IPluginDeriver<DerivDef>> = new Map();
  protected parentInjector = inject(EnvironmentInjector);
  protected decorated = inject<IPluginDiscovery<BasePluginDef>>(PLUGIN_DISCOVERY_DECORATED);

  protected override createDeriver(basePLuginDefinition: BasePluginDef): IPluginDeriver<DerivDef> {
    const { parentInjector } = this;

    return runInInjectionContext(parentInjector, () => {
      const { deriverClass } = basePLuginDefinition;
      if (!deriverClass) {
        const { id, pluginType } = basePLuginDefinition;
        throw new PluginException(pluginType, id, 'Plugin deriver is missing. PluginDiscoveryWithDerivativeDecoratorDefault.createDeriver()')
      }
      const injector = Injector.create({
        providers: [
          { provide: PLUGIN_DERIVER, useClass: deriverClass! }
        ],
        parent: parentInjector
      });

      return injector.get<IPluginDeriver<DerivDef>>(PLUGIN_DERIVER)
    });
  }
}
