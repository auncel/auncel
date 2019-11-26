/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 26th November 2019 11:20 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 26th November 2019 11:20 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 MIT License                                         *
 *-------------------------------------------------------------------------- */

import { objectCompare } from './utils';

describe('utils: objectCompare', () => {
  test('2 equal objects', () => {
    const res = objectCompare({ a: 1, b: 'string', c: {} }, { a: 1, b: 'string', c: {} }, ['a', 'b', 'c']);
    expect(res.misson.length).toBe(0);
    expect(res.inequality.length).toBe(0);
    expect(res.extra.length).toBe(0);
  });

  test('2 objects\'s property c is different', () => {
    const res = objectCompare({ a: 1, b: 'string', c: {} }, { a: 1, b: 'string', c: 'diff' }, ['a', 'b', 'c']);
    expect(res.misson.length).toBe(0);
    expect(res.inequality).toEqual([{ key: 'c', expect: {}, actual: 'diff' }]);
    expect(res.extra.length).toBe(0);
  });

  test('object2 miss property `b`', () => {
    const res = objectCompare({ a: 1, b: 'string' }, { a: 1 }, ['a', 'b']);
    expect(res.misson).toEqual([{ key: 'b', expect: 'string' }]);
    expect(res.inequality.length).toBe(0);
    expect(res.extra.length).toBe(0);
  });

  test('object2 has extra property `d`', () => {
    const res = objectCompare({ a: 1, b: 'string', c: {} }, { a: 1, b: 'string', c: {}, d: 'extra' }, ['a', 'b', 'c']);
    expect(res.misson.length).toBe(0);
    expect(res.inequality.length).toBe(0);
    expect(res.extra).toEqual([{ key: 'd', actual: 'extra' }]);
  });
});