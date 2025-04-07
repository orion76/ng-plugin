

import { createPluginManagerToken, PluginManagerDefault } from "../../src/plugin-manager";
import { PluginDiscoveryDefault } from "../../src/public-api";
import { PLUGIN_TEMPLATE_PLUGIN_TYPE } from "./plugin";
import { IPluginTemplate } from "./types";

export const PLUGIN_TEMPLATE_PLUGIN_MANAGER = createPluginManagerToken<IPluginTemplate>(
    PLUGIN_TEMPLATE_PLUGIN_TYPE,
    PluginManagerDefault,
    PluginDiscoveryDefault
)