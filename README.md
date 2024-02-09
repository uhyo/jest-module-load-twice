# Jest duplicated module loading repro

Jest issue: [#9669](https://github.com/jestjs/jest/issues/9669)

## Steps to reproduce

1. `npm install`
2. `npm test`

See an error shown by styled-components:

```
Trying to insert a new style tag, but the given Node is unmounted!

- Are you using a custom target that isn't mounted?
- Does your document not have a valid head element?
- Have you accidentally removed a style tag manually?
```

## Explanation

This repository demonstrates how loading `styled-components` twice can lead to a weird runtime error during Jest tests. 

**Note:** we're using a little dated version of `styled-components` (v4) because it's easier to reproduce the issue with it. However, the latest version still should not be loaded twice in general. Also, the issue itself is not specific to `styled-components` and can happen with any other module that does not support being loaded twice.

### Why is this happening?

`index.test.js` contains a following `jest.mock` call:

```js
jest.mock("./sub2");
```

When Jest loads a mocked module, it temporally clears its module cache. Therefore, any module that was loaded from inside `sub2` will be loaded again. If the same module has been loaded before, it will be loaded twice. This is why `styled-components` is loaded twice.