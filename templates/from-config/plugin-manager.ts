


import { createPluginManagerToken, PluginManagerDefault } from "../../src/plugin-manager";
import { PluginExampleDiscovery } from "./discovery";
import { PLUGIN_TEMPLATE__PLUGIN_TYPE } from "./plugin";
import { IPluginTemplate } from "./types";

export const PLUGIN_EXAMPLE_PLUGIN_MANAGER = createPluginManagerToken<IPluginTemplate>(
    PLUGIN_TEMPLATE__PLUGIN_TYPE,
    PluginManagerDefault,
    PluginExampleDiscovery
)