# Exercise 1: Implement JSON-Form Widget Open Handler

<a href="https://gitpod.io#https://github.com/TypeFox/ecf2018-theia-workshop/tree/exercise-1" target="_blank">
<img src="https://user-images.githubusercontent.com/914497/41273050-1f1658d4-6e18-11e8-884e-7270d4ac4923.gif" />
</a>

Your first exercise is to implement for which file the JSON-Form widget should be opened, and when it should be used as a primary widget.
Right now, it can be opened for any file, and an editor widget has a priority over it.

<img src="https://user-images.githubusercontent.com/3082655/41194491-1f3b2d9c-6c1c-11e8-9762-f7838e858611.png" height="256px" />

Change [JsonschemaFormOpenHandler](jsonschema-form-extension/src/browser/jsonschema-form-open-handler.ts) in a way that:

- only JSON files can be opened;
- if a file name ends with `-data` (e.g.  `simple-data.json`) then the double-click on a file should open the JSON-form widget instead of the editor widget;
  -  otherwise, the editor widget should be opened.

## The solution

When you finish, compare your solution with the [suggested](https://github.com/TypeFox/ecf2018-theia-workshop/blob/d32124df4b77c236c0e6b1da71cd5243b53aa0dd/jsonschema-form-extension/src/browser/jsonschema-form-open-handler.ts#L16-L24).