import { JsonschemaFormCommandContribution, JsonschemaFormMenuContribution } from './jsonschema-form-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";
import { OpenHandler, WidgetFactory } from "@theia/core/lib/browser";
import { ThemeService } from "@theia/core/lib/browser/theming";
import { ContainerModule } from "inversify";
import { JsonschemaFormWidget, JsonschemaFormWidgetOptions } from './jsonschema-form-widget';
import { JsonschemaFormOpenHandler } from './jsonschema-form-open-handler';

const bootstrapLink = document.createElement("link");
bootstrapLink.rel = 'stylesheet';
document.head.appendChild(bootstrapLink);

function updateTheme(newTheme: string): void {
    const theme = bootstrapLink.getAttribute('theme');
    if (theme === newTheme) {
        return;
    }
    bootstrapLink.setAttribute('theme', newTheme);
    bootstrapLink.href = newTheme === 'dark' ?
        '//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/darkly/bootstrap.min.css' :
        '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css';
}
updateTheme(ThemeService.get().getCurrentTheme().id);
ThemeService.get().onThemeChange(({newTheme}) => updateTheme(newTheme.id));

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    // add your contribution bindings here

    bind(CommandContribution).to(JsonschemaFormCommandContribution).inSingletonScope();
    bind(MenuContribution).to(JsonschemaFormMenuContribution).inSingletonScope();

    bind(OpenHandler).to(JsonschemaFormOpenHandler).inSingletonScope();
    bind(WidgetFactory).toDynamicValue(({ container }) => ({
        id: JsonschemaFormWidget.id,
        createWidget: (options: JsonschemaFormWidgetOptions) => {
            const child = container.createChild();
            child.bind(JsonschemaFormWidgetOptions).toConstantValue(options);
            child.bind(JsonschemaFormWidget).toSelf();
            return child.get(JsonschemaFormWidget);
        }
    }));
});