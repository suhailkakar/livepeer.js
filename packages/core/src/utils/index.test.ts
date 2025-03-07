import { expect, it } from 'vitest';

import * as Exports from './';

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "deepMerge",
      "pick",
      "b64Decode",
      "b64Encode",
      "b64UrlDecode",
      "b64UrlEncode",
      "noop",
      "notEqual",
      "equal",
      "isNull",
      "isUndefined",
      "isNil",
      "isObject",
      "isNumber",
      "isString",
      "isBoolean",
      "isFunction",
      "isArray",
      "isWindow",
      "warn",
    ]
  `);
});
