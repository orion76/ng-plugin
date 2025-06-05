import { inject, Injector, runInInjectionContext } from '@angular/core';
import { IPlugin, PluginBuilderBase, TPluginDefinition } from '@orion76/plugin';
import { PLUGIN_DEFINITION, PLUGIN_INSTANCE } from '../injection-tokens';

export class PluginBuilderDefault<P extends IPlugin> extends PluginBuilderBase<P> {
  protected parentInjector = inject(Injector);

  override build(definition: TPluginDefinition<P>): P {
    const { parentInjector } = this;

    return runInInjectionContext(parentInjector, () => {
      const injector = Injector.create({
        providers: [
          { provide: PLUGIN_DEFINITION, useValue: definition },
          { provide: PLUGIN_INSTANCE, useClass: definition.pluginClass! }
        ],
        parent: parentInjector
      });
      return injector.get<P>(PLUGIN_INSTANCE)
    });
  }
}
