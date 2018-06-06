import { ContainerModule } from "inversify";
import { JsonschemaFormCommandContribution, JsonschemaFormMenuContribution } from './jsonschema-form-contribution';
import { CommandContribution, MenuContribution } from "@theia/core/lib/common";

export default new ContainerModule(bind => {
    // add your contribution bindings here

    bind(CommandContribution).to(JsonschemaFormCommandContribution).inSingletonScope();
    bind(MenuContribution).to(JsonschemaFormMenuContribution).inSingletonScope();
});