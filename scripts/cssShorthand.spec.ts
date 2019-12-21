/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 21st December 2019 5:36 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 21st December 2019 5:36 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import cssLogogram from './cssShorthand';

describe('css logogram', () => {
  test('from common/const/css', () => {
    const res = cssLogogram();
    console.log(JSON.stringify(res,null, 2));
    expect({}).not.toBeNull();
  });
});
