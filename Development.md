## Building

    yarn
    
## Running

    cd browser-app
    yarn start --hostname 0.0.0.0 ../workspace

## Developing

Start watching of the extension.

    cd jsonschema-form-extension
    yarn watch

Start watching of the application.

    cd browser-app
    yarn watching

## Publishing

Create a npm user and login to the npm registry, [more on npm publishing](https://docs.npmjs.com/getting-started/publishing-npm-packages).

    npm login

Publish packages with lerna to update versions properly across local packages, [more on publishing with lerna](https://github.com/lerna/lerna#publish).

    npx lerna publish
