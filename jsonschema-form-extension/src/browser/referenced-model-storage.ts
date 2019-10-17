import URI from "@theia/core/lib/common/uri";
import * as jsoncparser from "jsonc-parser";
import { MonacoTextModelService } from "@theia/monaco/lib/browser/monaco-text-model-service";
import { MonacoEditorModel } from "@theia/monaco/lib/browser/monaco-editor-model";
import { DisposableCollection, Emitter, Disposable, Path } from "@theia/core";
import { JSONValue, JSONExt } from "@phosphor/coreutils";

export class ReferencedModelStorage<T> implements Disposable {

    protected referencedModel: MonacoEditorModel | undefined;
    protected readonly toDispose = new DisposableCollection();

    protected readonly onDidChangeEmitter = new Emitter<T>();
    readonly onDidChange = this.onDidChangeEmitter.event;

    constructor(
        readonly model: MonacoEditorModel,
        readonly modelService: MonacoTextModelService,
        readonly formDataProperty: string,
        readonly defaultValue: T
    ) { }

    dispose(): void {
        this.toDispose.dispose();
    }

    async update(formData: JSONValue): Promise<void> {
        const uri = this.resolveUri(formData);
        if (!uri) {
            this.dispose();
            this.reconcile();
            return;
        }
        if (this.referencedModel && this.referencedModel.uri.toString() === uri.toString()) {
            return;
        }
        this.toDispose.dispose();
        const reference = await this.modelService.createModelReference(uri);
        this.toDispose.push(reference);

        this.referencedModel = reference.object;
        this.toDispose.push(Disposable.create(() => this.referencedModel = undefined));

        this.toDispose.push(this.referencedModel.onDidChangeContent(() => this.reconcile()));
        this.reconcile();
    }

    protected reconcile(): void {
        if (this.referencedModel) {
            const schema = jsoncparser.parse(jsoncparser.stripComments(this.referencedModel.getText())) || {};
            this.onDidChangeEmitter.fire(schema as T);
        } else {
            this.onDidChangeEmitter.fire(this.defaultValue);
        }
    }

    protected resolveUri(formData: JSONValue): URI | undefined {
        if (!JSONExt.isObject(formData)) {
            return undefined;
        }
        const value = formData[this.formDataProperty];
        if (typeof value !== 'string') {
            return undefined;
        }
        const uri = new URI(value);
        const path = new Path(value);
        return uri.scheme !== 'file' || path.isAbsolute ? uri : new URI(this.model.uri.toString()).parent.resolve(path);
    }

}