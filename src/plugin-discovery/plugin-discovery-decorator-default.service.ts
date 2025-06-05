import { assertInInjectionContext, inject, Injectable, INJECTOR, Injector, runInInjectionContext } from '@angular/core';
import { getCurrentInjector } from '@angular/core/primitives/di';
import { IPluginDefinition, IPluginDeriver, IPluginDiscovery, PluginDiscoveryDecorator, PluginException } from '@orion76/plugin';
import { PLUGIN_DERIVER, PLUGIN_DISCOVERY_DECORATED } from '../injection-tokens';

function getInjector(): Injector {
  debugger;
  assertInInjectionContext(getInjector);

  const injector = getCurrentInjector();
  if (!(injector instanceof Injector)) {
    throw new Error();
  }
  return injector!;
}


export class PluginDiscoveryDecoratorDefault<
  BasePluginDef extends IPluginDefinition = IPluginDefinition,
  DerivDef extends object = object,
  PluginDef extends BasePluginDef & DerivDef = BasePluginDef & DerivDef
> extends PluginDiscoveryDecorator<BasePluginDef, DerivDef, PluginDef> {

  protected override derivers: Map<string, IPluginDeriver<DerivDef>> = new Map();
  protected parentInjector = inject(Injector);
  protected decorated = inject<IPluginDiscovery<BasePluginDef>>(PLUGIN_DISCOVERY_DECORATED);

  protected override createDeriver(basePLuginDefinition: BasePluginDef): IPluginDeriver<DerivDef> {
    const { parentInjector } = this;

    return runInInjectionContext(parentInjector, () => {
      const { deriverClass } = basePLuginDefinition;
      if (!deriverClass) {
        const { id, type } = basePLuginDefinition;
        throw new PluginException(type, id, 'Plugin deriver is missing. PluginDiscoveryWithDerivativeDecoratorDefault.createDeriver()')
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
