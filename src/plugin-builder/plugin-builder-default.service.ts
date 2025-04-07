import { EnvironmentInjector, inject, Injector, runInInjectionContext } from '@angular/core';
import { IPlugin, PluginBuilderBase, TPluginDefinition } from '@orion76/plugin';
import { PLUGIN_INSTANCE } from '../injection-tokens';

export class PluginBuilderDefault<P extends IPlugin> extends PluginBuilderBase<P> {
  private parentInjector = inject(EnvironmentInjector);

  override build(definition: TPluginDefinition<P>): P {
    const { parentInjector } = this;

    return runInInjectionContext(parentInjector, () => {
      const injector = Injector.create({
        providers: [
          { provide: PLUGIN_INSTANCE, useClass: definition.pluginClass! }
        ],
        parent: parentInjector
      });
      return injector.get<P>(PLUGIN_INSTANCE)
    });
  }
}
