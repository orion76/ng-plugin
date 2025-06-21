import { InjectionToken, Provider } from '@angular/core';
import { IPlugin, IPluginManager } from '@orion76/plugin';
import { createPluginManagerTokenFactory } from './factories';
import { IPluginManagerFactoryOptions } from './types';

export function providePluginManager<P extends IPlugin>(
    type: string,
    pluginManagerToken: InjectionToken<IPluginManager<P>>,
    options?: IPluginManagerFactoryOptions<P>

): Provider {
    return { provide: pluginManagerToken, useFactory: createPluginManagerTokenFactory(type, options) }
}