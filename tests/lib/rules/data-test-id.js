/**
 * @fileoverview Check data-test-id
 * @author Prashant Swami
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/data-test-id"),

  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------


const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

ruleTester.run('data-test-id', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: '<template><input data-testid="someUniqueId" v-model="test" /></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><button data-testid="someUniqueId" @click="doAction" >Go</button></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><custom data-testid="someUniqueId" @change="doAction" >Go</custom></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><custom :data-testid="`someUniqueId`" @change="doAction" >Go</custom></template>'
    }
  ],

  invalid: [
    {
      filename: 'test.vue',
      code: '<template><input v-model="test"></template>',
      output: '<template><input data-testid="test" v-model="test"></template>',
      options: ['never'],
      errors: [
        {
          message: "Expected 'data-testid' with v-model.",
          type: 'VElement',
          line: 1
        }
      ]
    },

    {
      filename: 'test.vue',
      code: '<template><custom v-model="test.again.src" /></template>',
      output: '<template><custom data-testid="test.again.src" v-model="test.again.src" /></template>',
      options: ['never'],
      errors: [
        {
          message: "Expected 'data-testid' with v-model.",
          type: 'VElement',
          line: 1
        }
      ]
    },

    {
      filename: 'test.vue',
      code: '<template><custom v-model="test.again" /></template>',
      output: '<template><custom data-testid="test.again" v-model="test.again" /></template>',
      options: ['never'],
      errors: [
        {
          message: "Expected 'data-testid' with v-model.",
          type: 'VElement',
          line: 1
        }
      ]
    },

    {
      filename: 'test.vue',
      code: `<template><custom v-model="test['again']" /></template>`,
      output: `<template><custom data-testid="test.again" v-model="test['again']" /></template>`,
      options: ['never'],
      errors: [
        {
          message: "Expected 'data-testid' with v-model.",
          type: 'VElement',
          line: 1
        }
      ]
    },

    {
      filename: 'test.vue',
      code: `<template><custom v-model="test[5]" /></template>`,
      output: `<template><custom data-testid="test.5" v-model="test[5]" /></template>`,
      options: ['never'],
      errors: [
        {
          message: "Expected 'data-testid' with v-model.",
          type: 'VElement',
          line: 1
        }
      ]
    },

    {
      filename: 'test.vue',
      code: `<template><custom v-model="test[5]['val']" /></template>`,
      output: `<template><custom data-testid="test.5.val" v-model="test[5]['val']" /></template>`,
      options: ['never'],
      errors: [
        {
          message: "Expected 'data-testid' with v-model.",
          type: 'VElement',
          line: 1
        }
      ]
    },

    {
      filename: 'test.vue',
      code: `<template><button @click="go">Save</button></template>`,
      output: `<template><button data-testid="go" @click="go">Save</button></template>`,
      options: ['never'],
      errors: [
        {
          message: "Expected 'data-testid' with event.",
          type: 'VElement',
          line: 1
        }
      ]
    },

    {
      filename: 'test.vue',
      code: `<template><custom @change="go">Save</custom></template>`,
      output: `<template><custom data-testid="go" @change="go">Save</custom></template>`,
      options: ['never'],
      errors: [
        {
          message: "Expected 'data-testid' with event.",
          type: 'VElement',
          line: 1
        }
      ]
    },

    {
      filename: 'test.vue',
      code: `<template><custom @click="go">Save</custom></template>`,
      output: `<template><custom data-testid="go" @click="go">Save</custom></template>`,
      options: ['never'],
      errors: [
        {
          message: "Expected 'data-testid' with event.",
          type: 'VElement',
          line: 1
        }
      ]
    },

    {
      filename: 'test.vue',
      code: `<template><custom v-model="someModel" @change="go">Save</custom></template>`,
      output: `<template><custom data-testid="someModel" v-model="someModel" @change="go">Save</custom></template>`,
      options: ['never'],
      errors: [
        {
          message: "Expected 'data-testid' with v-model.",
          type: 'VElement',
          line: 1
        }
      ]
    },

    {
      filename: 'test.vue',
      code: `<template><custom @change="go(testId)">Save</custom></template>`,
      output: `<template><custom data-testid="go" @change="go(testId)">Save</custom></template>`,
      options: ['never'],
      errors: [
        {
          message: "Expected 'data-testid' with event.",
          type: 'VElement',
          line: 1
        }
      ]
    },

    {
      filename: 'test.vue',
      code: `<template><custom @change="go(testId)" @click="onClick(testId)">Save</custom></template>`,
      output: `<template><custom data-testid="go" @change="go(testId)" @click="onClick(testId)">Save</custom></template>`,
      options: ['never'],
      errors: [
        {
          message: "Expected 'data-testid' with event.",
          type: 'VElement',
          line: 1
        }
      ]
    },

    {
      filename: 'test.vue',
      code: `<template><custom @click="onClick(testId)" @change="go(testId)" >Save</custom></template>`,
      output: `<template><custom data-testid="onClick" @click="onClick(testId)" @change="go(testId)" >Save</custom></template>`,
      options: ['never'],
      errors: [
        {
          message: "Expected 'data-testid' with event.",
          type: 'VElement',
          line: 1
        }
      ]
    },
  ]
})
