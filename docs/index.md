# eslint-plugin-test-id

This checks is data-test-id prop is present, on some tags which are useful for e2e testing

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-test-id`:

```
$ npm install eslint-plugin-test-id --save-dev
```

## Usage

Add `test-id` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["test-id"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "test-id/data-test-id": "error"
  }
}
```

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```vue

<input v-model="someModel">

```

Examples of **correct** code for this rule:

```vue

<input data-testid="someUniqueString" v-model="someModel">

```

## How Fix will work

### Scenario 1

```vue
<template><custom v-model="test" /></template>
```

will fix to

```vue
<template><input data-testid="test" v-model="test" /></template>
```

### Scenario 2

```vue
<template><input v-model="test.again.src" /></template>
```

will fix to

```vue
<template>
  <custom data-testid="test.again.src" v-model="test.again.src" />
</template>
```

### Scenario 3

```vue
<template><custom v-model="test.again" /></template>
```

will fix to

```vue
<template><custom data-testid="test.again" v-model="test.again" /></template>
```

### Scenario 4

```vue
<template><custom v-model="test['again']" /></template>
```

will fix to

```vue
<template>
  <custom data-testid="test.again" v-model="test['again']" />
</template>
```

### Scenario 5

```vue
<template><custom v-model="test[5]" /></template>
```

will fix to

```vue
<template><custom data-testid="test.5" v-model="test[5]" /></template>
```

### Scenario 5

```vue
<template><custom v-model="test[5]['val']" /></template>
```

will fix to

```vue
<template>
  <custom data-testid="test.5.val" v-model="test[5]['val']" />
</template>
```
