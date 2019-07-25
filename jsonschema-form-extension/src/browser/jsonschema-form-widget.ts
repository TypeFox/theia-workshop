import { injectable, inject, postConstruct } from "inversify";
import { BaseWidget, Message } from "@theia/core/lib/browser";
import URI from "@theia/core/lib/common/uri";
import { CommandService } from "@theia/core";
import { JsonschemaFormCommand } from "./jsonschema-form-contribution";

export const JsonschemaFormWidgetOptions = Symbol('JsonschemaFormWidgetOptions');
export interface JsonschemaFormWidgetOptions {
    uri: string
}

@injectable()
export class JsonschemaFormWidget extends BaseWidget {

    static id = 'jsonschema-form-widget';

    @inject(JsonschemaFormWidgetOptions)
    protected readonly options: JsonschemaFormWidgetOptions;

    @inject(CommandService)
    protected readonly commands: CommandService;
    
    protected sayHello: HTMLButtonElement;

    @postConstruct()
    protected async init(): Promise<void> {
        const { uri } = this.options;
        this.id = JsonschemaFormWidget.id + ':' + uri
        this.title.label = 'Form ' + new URI(uri).displayName;
        this.title.closable = true;
        
        this.sayHello = document.createElement('button');
        this.sayHello.textContent = JsonschemaFormCommand.label;
        this.node.appendChild(this.sayHello);
    }

    protected onActivateRequest(message: Message): void {
        super.onActivateRequest(message);
        this.sayHello.focus();
    }

    protected onBeforeAttach(message: Message): void {
        super.onBeforeAttach(message);
        this.addEventListener(this.sayHello, 'click', () => this.commands.executeCommand(JsonschemaFormCommand.id));
    }

}
