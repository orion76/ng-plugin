import { TestBed } from "@angular/core/testing";
import { IPluginBuilder } from "@orion76/plugin";
import { PluginBuilderDefault } from "../../plugin-builder/plugin-builder-default.service";


describe('PluginBuilderDefault', () => {
    let pluginBuilder: IPluginBuilder;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PluginBuilderDefault
            ]
        });
        pluginBuilder = TestBed.inject(PluginBuilderDefault);
    })
    it('should by created', () => {
        expect(pluginBuilder).toBeInstanceOf(PluginBuilderDefault);
    });
});