import { EnvironmentInjector, inject, Injector, Provider, runInInjectionContext } from '@angular/core';
import { IPlugin, IPluginDefinition, PluginBuilderBase, TPluginDefinition } from '@orion76/plugin';
import { PLUGIN_INSTANCE } from '../injection-tokens';

export class PluginBuilderDefault<P extends IPlugin> extends PluginBuilderBase<P> {
  private parentInjector = inject(EnvironmentInjector);

  override build(definition: TPluginDefinition<P>): P {
    const { parentInjector } = this;

    return runInInjectionContext(parentInjector, () => {
      const injector = Injector.create({
        providers: [
          createInstanceProvider(definition)
        ],
        parent: parentInjector
      });
      return injector.get<P>(PLUGIN_INSTANCE)
    });
  }
}

function createInstanceProvider(definition: IPluginDefinition): Provider {
  return { provide: PLUGIN_INSTANCE, useClass: definition.pluginClass! };
}
