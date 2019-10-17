# Exercise 3: Implement UI Schema Support for JSON-Form Widget

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/TypeFox/theia-workshop/tree/exercise-3)

[JsonschemaFormView](jsonschema-form-extension/src/browser/jsonschema-form-view.tsx) is a React component that allows building HTML forms based on JSON-schema for a JSON-file.
If a JSON-file gets changed then an HTML form gets updated and vice versa. A JSON-schema file is referenced relative to a JSON-file via a special property `$schema`.

`JsonschemaFormView` is based on [react-jsonschema-form](https://github.com/mozilla-services/react-jsonschema-form) component that allows customization of rendering with JSON via `uiSchema` property: https://github.com/mozilla-services/react-jsonschema-form#form-customization.

Your task is:
- to add a `$uiSchema` property to a JSON-file to access a UI JSON-schema file and customize rendering;
- whenever a UI JSON-Schema file gets changed then an HTML form should be updated as displayed below.

![uischema](https://user-images.githubusercontent.com/3082655/41195122-fe170490-6c27-11e8-81fc-d1accd89d971.gif)

## The solution

When you finish, compare your solution with the [suggested](https://github.com/TypeFox/theia-workshop/blob/1fee6cfddbaa6512db227f36efb8f07f0bd3f205/jsonschema-form-extension/src/browser/jsonschema-form-view.tsx#L13).
