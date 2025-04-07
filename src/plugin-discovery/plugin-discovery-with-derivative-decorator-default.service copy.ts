import { EnvironmentInjector, inject, Injector, runInInjectionContext } from '@angular/core';
import { IPluginDefinitionWithDeriver, IPluginDeriver, IPluginDiscovery, PluginDiscoveryWithDerivativesDecorator } from '@orion76/plugin';
import { PLUGIN_DISCOVERY_DECORATED, PLUGIN_DERIVER } from '../injection-tokens';



export class PluginDiscoveryWithDerivativeDecoratorDefault<
  BasePluginDef extends IPluginDefinitionWithDeriver = IPluginDefinitionWithDeriver,
  DerivDef extends object = object,
  PluginDef extends BasePluginDef & DerivDef = BasePluginDef & DerivDef
> extends PluginDiscoveryWithDerivativesDecorator<BasePluginDef, DerivDef, PluginDef> {

  protected override derivers: Map<string, IPluginDeriver<DerivDef>> = new Map();
  protected parentInjector = inject(EnvironmentInjector);
  protected decorated = inject<IPluginDiscovery<BasePluginDef>>(PLUGIN_DISCOVERY_DECORATED);

  protected override createDeriver(basePLuginDefinition: BasePluginDef): IPluginDeriver<DerivDef> {
    const { parentInjector } = this;

    return runInInjectionContext(parentInjector, () => {
      const injector = Injector.create({
        providers: [
          { provide: PLUGIN_DERIVER, useClass: basePLuginDefinition.deriverClass }
        ],
        parent: parentInjector
      });

      return injector.get<IPluginDeriver<DerivDef>>(PLUGIN_DERIVER)
    });
  }
}
