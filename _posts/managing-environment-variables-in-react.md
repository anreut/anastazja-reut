---
title: "Managing Environment Variables in React"
date: "2020-03-08"
excerpt: ""
tags:
- react
- webpack
---

Web development often requires developers to work in different environments. In the REST API world, frontend and backend are separated from each other. Very often, Front-end developers start working without having a ready backend. <!-- more -->In this case, it would be great to run the application with mocked data. When the backend is ready, we need to test the application with real data coming from the test server. And finally, the stage for deploying the application to the production server. For all these cases, we should be able to run the application in at least three modes: `mock`, `development` and `production`. And here, **environment variables** can be very useful.

In React apps, environment variables can be set and retrieved through a global `process.env` Object. This global Object is provided by Node.js.

I'm going to show you two ways to set environment variables for React project: using `create-react-app` and using custom webpack config.

---

### Way 1: Create React App

If you created your project using `create-react-app` plugin, this is the way for you. In `create-react-app` this feature is available by default (with `react-scripts@0.2.3` and higher).

In your `package.json` add `start:mock` script:

```json
 // Linux, macOS
  "scripts": {
    "start": "react-scripts start",
    "start:mock": "REACT_APP_STAGE=mock npm start",
  }
```

```json
 // Windows
  "scripts": {
    "start": "react-scripts start",
    "start:mock": "set REACT_APP_STAGE=mock && npm start",
  }
```

We set `REACT_APP_STAGE` variable with a value `mock`. The important thing here is that in `create-react-app` **the variable name must begin with** `REACT_APP_`. **Any other variables will be ignored.**

Now in your code you can get the value of the variable through `process.env.REACT_APP_STAGE`:

```js
console.log(process.env.REACT_APP_STAGE) // mock;
```

---

### Way 2: Custom Webpack config

The webpack also supports environment variables, but in a slightly different way. In `package.json` file we define the variable `STAGE` the following way:

```json
  "scripts": {
    "start:mock": "webpack-dev-server --env.STAGE=mock --config webpack.config.js",
  }
```

The webpack option `--env` allows you to pass in as many environment variables as you like. **Note that in this case we can select the variable name. This doesn't have to begin with**  `REACT_APP_`.

But for now this variable can't be accessible in the code. We need to tell webpack to compile those variables. First, convert your webpack config to a function to get access to `--env` option:

```js
module.exports = env => {
  return {
    module: {
      // Rules
    },
  };
};
```
Add webpack [DefinePlugin](https://webpack.js.org/plugins/define-plugin/#root) to plugins array (don't forget to require webpack). This plugin allows you to create global constants which can be configured at compile time.

```js
const webpack = require('webpack');

module.exports = env => {
  return {
    module: {
      // Rules
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.STAGE': JSON.stringify(
          `${env.STAGE}`,
        ),
      }),
    ],
  };
};
```
Now the `STAGE` variable can be used in your code through `process.env.STAGE`:

```js
console.log(process.env.STAGE); // mock
```

---
#### References:
[Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
[DefinePlugin](https://webpack.js.org/plugins/define-plugin/#root)