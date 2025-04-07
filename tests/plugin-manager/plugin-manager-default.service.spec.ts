import { TestBed } from "@angular/core/testing";

import { IPluginManager } from "@orion76/plugin";
import { PLUGIN_TYPE_TEST, TEST_PLUGINS_DATA } from "../plugins.mock";
import { createPluginManagerToken, PluginManagerDefault } from "../../src/plugin-manager";


const PLUGIN_MANAGER_TEST = createPluginManagerToken( PLUGIN_TYPE_TEST);

describe('PluginManagerDefault', () => {
  let manager: IPluginManager;
  beforeEach(() => {

    manager = TestBed.inject(PLUGIN_MANAGER_TEST)
  })
  it('PluginManagerDefault should be provided', () => {
    expect(manager).toBeInstanceOf(PluginManagerDefault)
  });
  describe('Mehot getDefinitions', () => {
    it('should return plugin definitions', () => {
      const definitions = manager.getDefinitions();
      expect(definitions.length).toEqual(3);

      definitions.forEach((def) => {
        expect(TEST_PLUGINS_DATA.find((data) => data.id === def.id)).toBeTruthy();
      })
    });
  });
  describe('Method getDefinition(pluginId)', () => {
    it('should return plugin definition', () => {
      TEST_PLUGINS_DATA.forEach((data) => {
        const { id } = data;
        const definition = manager.getDefinition(id);
        expect(definition).toBeTruthy();
        expect(definition?.id).toEqual(id);
      })
    });
  });
  describe('Method getInstance(pluginId)', () => {
    it('should return plugin instance', () => {
      TEST_PLUGINS_DATA.forEach((data) => {
        const { id, cls } = data;
        const instance = manager.getInstance(id);
        expect(instance).toBeInstanceOf(cls);
      })
    });
  });
});