/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 21st December 2019 4:10 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 21st December 2019 4:10 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import encrypt from './encrypt';

describe('md5 encrpyt', ()=>{
  test('password', () => {
    const passsword = encrypt('password');
    expect(passsword).toBe('cb28e00ef51374b841fb5c189b2b91c9');
  });
});