import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from "@theia/core/lib/common";
import { CommonMenus } from "@theia/core/lib/browser";

export const JsonschemaFormCommand = {
    id: 'JsonschemaForm.command',
    label: "Shows a message"
};

@injectable()
export class JsonschemaFormCommandContribution implements CommandContribution {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(JsonschemaFormCommand, {
            execute: () => this.messageService.info('Hello World!')
        });
    }
}

@injectable()
export class JsonschemaFormMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: JsonschemaFormCommand.id,
            label: 'Say Hello'
        });
    }
}