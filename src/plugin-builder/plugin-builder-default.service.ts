import { inject, Injector, Provider, runInInjectionContext } from '@angular/core';
import { IPlugin, PluginBuilderBase, TPluginDefinition } from '@orion76/plugin';
import { PLUGIN_DEFINITION, PLUGIN_INSTANCE } from '../injection-tokens';

export class PluginBuilderDefault<P extends IPlugin> extends PluginBuilderBase<P> {
  protected parentInjector = inject(Injector);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAdditionalProviders(definition?: TPluginDefinition<P>): Provider[] {
    return [];
  }
  override build(definition: TPluginDefinition<P>): P {
    const { parentInjector } = this;

    return runInInjectionContext(parentInjector, () => {
      const injector = Injector.create({
        providers: [
          { provide: PLUGIN_DEFINITION, useValue: definition },
          { provide: PLUGIN_INSTANCE, useClass: definition.pluginClass! },
          ...this.getAdditionalProviders(definition)
        ],
        parent: parentInjector
      });
      return injector.get<P>(PLUGIN_INSTANCE)
    });
  }
}
