import { WidgetOpenHandler } from "@theia/core/lib/browser";
import { JsonschemaFormWidget, JsonschemaFormWidgetOptions } from "./jsonschema-form-widget";
import URI from "@theia/core/lib/common/uri";
import { injectable, inject } from "inversify";
import { EditorManager } from "@theia/editor/lib/browser";

@injectable()
export class JsonschemaFormOpenHandler extends WidgetOpenHandler<JsonschemaFormWidget> {
    
    readonly id = JsonschemaFormWidget.id;
    readonly label = "Form";

    @inject(EditorManager)
    protected readonly editorManager: EditorManager;

    /**
     * Test whether this handler can open the given URI for given options.
     * Return a positive number if this handler can open; otherwise it cannot.
     *
     * A returned value indicating a priority of this handler.
     */
    canHandle(uri: URI): number {
        return this.editorManager.canHandle(uri) / 2;
    }

    protected createWidgetOptions(uri: URI): JsonschemaFormWidgetOptions {
        return { uri: uri.withoutFragment().toString() };
    }
    
}