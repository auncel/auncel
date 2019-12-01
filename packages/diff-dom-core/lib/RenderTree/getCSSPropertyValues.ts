/* --------------------------------------------------------------------------*
 * Description: 获取 CSS 属性值                                               *
 *                                                                           *
 * File Created: Wednesday, 27th November 2019 9:36 pm                       *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Wednesday, 27th November 2019 9:36 pm                      *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 MIT License                                         *
 *-------------------------------------------------------------------------- */

import { parseCSS } from '../CSSTree/parseCSS';

const UUID_ATTR = '__uuid__';

let idx = 0;
function uuid(): string {
  return String(idx++);
}

const elementCache: Map<string, Map<string, string>> = new Map();
export function computeElementStyle(document: Document): Map<string, Map<string, string>> {
  const $userStyle = document.head.lastElementChild;
  const stylesheet = $userStyle.innerHTML;
  const selectorMap: Map<string, Set<string>> = parseCSS(stylesheet);
  // eslint-disable-next-line no-restricted-syntax
  for (const [selector, properties] of selectorMap) {
    const $elementList = document.querySelectorAll(selector);
    $elementList.forEach((element) => {
      let elementUuid = element.getAttribute(UUID_ATTR);
      let propertyMap: Map<string, string> = null;
      if (elementCache.has(elementUuid)) {
        propertyMap = elementCache.get(elementUuid);
      } else {
        elementUuid = uuid();
        element.setAttribute(UUID_ATTR, elementUuid);
        propertyMap = new Map<string, string>();
        elementCache.set(elementUuid, propertyMap);
      }
      const elementStyle = window.getComputedStyle(element);
      properties.forEach((property) => {
        const propertyValue = elementStyle[property];
        propertyMap.set(property, propertyValue);
      });
    });
  }
  return elementCache;
}
