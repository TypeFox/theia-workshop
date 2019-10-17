# Exercise 0: Build Theia Application

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/TypeFox/theia-workshop/tree/exercise-0)

It is the warm-up exercise to get your familiar with the project structure and how to build and run it.

## The Theia extension project structure

Theia applications and extensions are node packages.
Each node package has [package.json](https://docs.npmjs.com/files/package.json) file where its name, dependencies, and build scripts are declared.

This project was scaffolded with a [Theia extension generator](https://github.com/theia-ide/generator-theia-extension#theia-extension-generator) and consists of several packages:

- [jsonschema-form-extension](jsonschema-form-extension/package.json) - a Theia extension package
- [browser-app](browser-app/package.json) - a Theia application for the browser environment composed of basic Theia extensions and `jsonschema-form-extension`
- [electron-app](electron-app/package.json) - a Theia application for the desktop environment
- [root](package.json) - a root package to wire all local packages (workspaces)

A repo consisting of several packages is called a monorepo. We use [yarn](https://yarnpkg.com/lang/en/) to manage packages since it has better monorepo support: https://yarnpkg.com/lang/en/docs/workspaces/.

## Building

Let's start by running `yarn` in the root package:

- `yarn` downloads dependencies for all packages and install them in `node_modules` folders where it is required;
- then it runs `prepare` script from the root package to run `prepare` a script in each local package with [lerna](https://github.com/lerna/lerna);
  - `prepare` script in [jsonschema-form-extension](jsonschema-form-extension/package.json) runs [Typescipt](https://www.typescriptlang.org/) to compile the extension source code;
  - and `prepare` script in [browser-app](browser-app/package.json) runs [Theia CLI](https://github.com/theia-ide/theia/blob/master/dev-packages/cli/README.md#theia-cli) to package the application.

## Running

Now start a new Theia application:

    cd browser-app
    yarn start ../workspace

Gitpod will notify you that the server is listening on port 3000.
Click on `Open Browser` to open a new page with the Theia application.
You can verify that `jsonschema-form-extension` extension is installed by triggering `Shows a message` command from the quick command palette (F1).

Note: You can also open the Theia application by prefixing a hostname with `3000-`, for example: `https://3000-b54c750a-4d00-451d-b53f-f9e0d3cd7e29.ws.gitpod.io/`.

## Developing

It's time to get your hands dirty with some coding.
For it, you will need two additional terminals: (1) to incrementally compile the extension and (2) package the application correspondingly.
You can open a new terminal with `Open New Terminal` command from the quick command palette (F1).

In the first terminal, start watching of `jsonschema-form-extension`.

    cd jsonschema-form-extension
    yarn watch

In the second, start watching of the browser app.

    cd browser-app
    yarn watch

Now, whenever you change some code in `jsonschema-form-extension` extension, it gets incrementally recompiled and packaged in the final application.

Go and change a message displayed by `Shows a message` command in [jsonschema-form-contribution.ts](jsonschema-form-extension/src/browser/jsonschema-form-contribution.ts),
then refresh a page with the Theia application to apply changes and trigger the command to verify it.

## Bonus: configure Gitpod tasks

### Create a fork

- View -> Find Command... (F1)
- GitHub: Fork -> Fork to my account

Gitpod will ask you to grant permission to be able to create forks and commit changes on your behalf.

### Commit generated code

- View -> SCM
- Enter a commit message.
- In the SCM toolbar: `...` -> Stage All Changes
- In the SCM toolbar click on the check icon to create a commit.

### Change .gitpod.yml file

When starting or restarting a workspace you typically want to run certain tasks. Most probably that includes the build and maybe also running tests and automatically start the application in e.g. a dev server.

Gitpod allows you to configure start tasks in the .gitpod.yml file.

Add to [.gitpod.yml](.gitpod.yml) following tasks:
```yaml
tasks:
  - init: yarn
    command: |
      gp sync-done init
      cd jsonschema-form-extension
      yarn watch
  - command: |
      gp sync-await init
      cd browser-app
      yarn watch
    name: Watch browser-app
    openMode: split-right
  - command: |
      gp sync-await init
      cd browser-app
      yarn start ../workspace
    name: Run browser-app
    openMode: tab-after
```

- The first task executes the init command on first workspace start
to install dependencied and build the project.
After that it starts watching `jsonschema-form-extension` extension
on each workspace start.
- The second task awaits when the init command is finished and then
starts watching of the browser application on each workspace start.
It also splits a new terminal right relative to the terminal of first task.
- The last task awaits when the init command is finished as well and then
launches the browser application on each workspace start.
 It adds a new terminal after the terminal of second task.

See to learn more: https://www.gitpod.io/docs/44_config_start_tasks/

### Start a new workspace

- Commmit changes
- Open `exercise-0` branch in Gitpod for your fork.
- Check that:
  - The application is already built and running. You should see `Open Browser` notification.
  - Terminals are configured according to tasks.