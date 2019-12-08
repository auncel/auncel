/**
 * @jest-environment jsdom
 */

/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 1st December 2019 8:30 pm                           *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 1st December 2019 8:30 pm                          *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 MIT License                                         *
 *-------------------------------------------------------------------------- */

import { computeElementStyle } from './getCSSPropertyValues';
import { USER_STYLE_ID } from '../const';
import { appendUuid } from './appendUuid';

const fragment = `
<div class="listItem_listItem">
  <h1>
    <a class="text" href="/post/2019-05-08-separation-in-thousandth">数字表示成千位分隔形式的几种解法</a>
  </h1>
  <p>Wrote @ 2019-12-01</p>
</div>`;

const styesheet = `
.listItem_listItem {
  background-color: #fff;
  padding: 30px 50px;
  margin: 20px;
  box-shadow: 0 7px 7px 7px #eee;
  border-radius: 10px;
}

h1 {
  font-size: 32px;
}

h1 a {
  text-decoration: none;
}

.text {
  padding: 20px;
  color: #333;
}
div p {
  color: #aaa;
}`;

// const html = htmlWrap(fragment, styesheet)

beforeAll(() => {
  document.body.innerHTML = fragment;
  const $style = document.createElement('style');
  $style.id = USER_STYLE_ID;
  $style.innerHTML = styesheet;
  document.head.appendChild($style);
  appendUuid(document);
});

describe('simple jsdom env', () => {
  test('DOM is ready', () => {
    expect(document.body.innerHTML).not.toBeNull();
  });

  test('simple', () => {
    const propetyMap = computeElementStyle(document);
    expect(propetyMap.size).toBe(4);
    expect(propetyMap.get('uuid_0_0').size).toBe(5);
  });
})