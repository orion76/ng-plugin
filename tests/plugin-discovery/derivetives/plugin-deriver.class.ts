import { PluginDeriverBase } from "@orion76/plugin";
import { PLUGIN_DERIVATIVES } from "../../../src/injection-tokens";
import { inject } from '@angular/core';

export abstract class PluginDeriverDefault<D extends object> extends PluginDeriverBase<D> {
    protected override derivatives = inject<D[]>(PLUGIN_DERIVATIVES);
}