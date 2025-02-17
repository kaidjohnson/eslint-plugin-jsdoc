import {jsdocTags} from '../../../src/tagNames';

const ALL_JSDOC_TAGS_COMMENT = '/** \n * @' + Object.keys(
  jsdocTags,
).reduce((string, tagName, idx) => {
  return string + (idx === 0 ? '' : '\n * @') + tagName;
}, '') + '\n */';

export default {
  invalid: [
    {
      code: `
        /** @typoo {string} */
        let a;
      `,
      errors: [
        {
          line: 2,
          message: 'Invalid JSDoc tag name "typoo".',
        },
      ],
    },
    {
      code: `
          /**
           * @Param
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag name "Param".',
        },
      ],
    },
    {
      code: `
          /**
           * @foo
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag name "foo".',
        },
      ],
    },
    {
      code: `
          /**
           * @arg foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag (preference). Replace "arg" JSDoc tag with "param".',
        },
      ],
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag (preference). Replace "param" JSDoc tag with "arg".',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: 'arg',
          },
        },
      },
    },
    {
      code: `
          /**
           * @arg foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag (preference). Replace "arg" JSDoc tag with "somethingDifferent".',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            arg: 'somethingDifferent',
          },
        },
      },
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag (preference). Replace "param" JSDoc tag with "parameter".',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: 'parameter',
          },
        },
      },
    },
    {
      code: `
          /**
           * @bar foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag name "bar".',
        },
      ],
    },
    {
      code: `
          /**
           * @baz @bar foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag name "baz".',
        },
      ],
      options: [{
        definedTags: ['bar'],
      }],
    },
    {
      code: `
            /**
             * @bar
             * @baz
             */
            function quux (foo) {

            }
        `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc tag name "baz".',
        },
      ],
      options: [{
        definedTags: ['bar'],
      }],
    },
    {
      code: `
          /**
           * @todo
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Blacklisted tag found (`@todo`)',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            todo: false,
          },
        },
      },
    },
    {
      code: `
          /**
           * @todo
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Please resolve to-dos or add to the tracker',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            todo: {
              message: 'Please resolve to-dos or add to the tracker',
            },
          },
        },
      },
    },
    {
      code: `
          /**
           * @todo
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Please use x-todo instead of todo',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            todo: {
              message: 'Please use x-todo instead of todo',
              replacement: 'x-todo',
            },
          },
        },
      },
    },
    {
      code: `
          /**
           * @todo
           */
          function quux () {

          }
      `,
      errors: [
        {
          message: 'Please use x-todo instead of todo',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            todo: {
              message: 'Please use x-todo instead of todo',
              replacement: 'x-todo',
            },
          },
        },
      },
    },
    {
      code: `
          /**
           * @todo
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 1,
          message: 'Invalid `settings.jsdoc.tagNamePreference`. Values must be falsy, a string, or an object.',
        },
        {
          message: 'Invalid JSDoc tag (preference). Replace "todo" JSDoc tag with "55".',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            todo: 55,
          },
        },
      },
    },
    {
      code: `
          /**
           * @property {object} a
           * @prop {boolean} b
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Invalid JSDoc tag (preference). Replace "prop" JSDoc tag with "property".',
        },
      ],
      output: `
          /**
           * @property {object} a
           * @property {boolean} b
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @abc foo
           * @abcd bar
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag (preference). Replace "abc" JSDoc tag with "abcd".',
        },
      ],
      options: [
        {
          definedTags: ['abcd'],
        },
      ],
      output: `
          /**
           * @abcd foo
           * @abcd bar
           */
          function quux () {

          }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            abc: 'abcd',
          },
        },
      },
    },
    {
      code: `
          /**
           * @abc
           * @abcd
           */
          function quux () {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Invalid JSDoc tag (preference). Replace "abc" JSDoc tag with "abcd".',
        },
      ],
      output: `
          /**
           * @abcd
           * @abcd
           */
          function quux () {

          }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            abc: 'abcd',
          },
        },
      },
    },
  ],
  valid: [
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @memberof! foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @arg foo
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: 'arg',
          },
        },
      },
    },
    {
      code: `
          /**
           * @bar foo
           */
          function quux (foo) {

          }
      `,
      options: [{
        definedTags: ['bar'],
      }],
    },
    {
      code: `
          /**
           * @baz @bar foo
           */
          function quux (foo) {

          }
      `,
      options: [{
        definedTags: ['baz', 'bar'],
      }],
    },
    {
      code: `
          /**
           * @baz @bar foo
           */
          function quux (foo) {

          }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: 'baz',
            returns: {
              message: 'Prefer `bar`',
              replacement: 'bar',
            },
            todo: false,
          },
        },
      },
    },
    {
      code: `${ALL_JSDOC_TAGS_COMMENT}\nfunction quux (foo) {}`,
    },
    {
      code: `
          /**
           *
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @todo
           */
          function quux () {

          }
      `,
    },
    {
      code: `
          /**
           * @extends Foo
           */
          function quux () {

          }
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            augments: {
              message: '@extends is to be used over @augments.',
              replacement: 'extends',
            },
          },
        },
      },
    },
  ],
};
