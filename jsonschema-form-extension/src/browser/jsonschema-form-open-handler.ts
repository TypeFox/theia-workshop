import { WidgetOpenHandler } from "@theia/core/lib/browser";
import { JsonschemaFormWidget } from "./jsonschema-form-widget";
import URI from "@theia/core/lib/common/uri";
import { injectable, inject } from "inversify";
import { EditorManager } from "@theia/editor/lib/browser";

@injectable()
export class JsonschemaFormOpenHandler extends WidgetOpenHandler<JsonschemaFormWidget> {
    
    readonly id = JsonschemaFormWidget.id;
    readonly label = "Form";

    @inject(EditorManager)
    protected readonly editorManager: EditorManager;

    canHandle(uri: URI): number {
        return this.editorManager.canHandle(uri) / 2;
    }
    
}