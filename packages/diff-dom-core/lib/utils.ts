import { TNodeRect } from '@feoj/common/types/domCore';
import { TAttributes, TTagAttribute } from '@feoj/common/types/element';
import { TCSSProperty } from '@feoj/common/types/css';
import { tokenize, TokenType } from '@feoj/common/css/tokenize';


let properties: TCSSProperty[] = null;
function getStyleProperties(): TCSSProperty[] {
  if (!properties) {
    const stylesheet = document.querySelector('#inject-style').innerHTML;
    const tokens = tokenize(stylesheet);
    properties = tokens
      .filter(t => t.type === TokenType.Property)
      .map(t => t.value as TCSSProperty);
  }
  return properties;
}

export function getStyle(node: Element): TAttributes {
  const styleObj: TAttributes = {};
  const style = getComputedStyle(node);
  const properties = getStyleProperties();
  properties.forEach((key) => {
    styleObj[key] = style.getPropertyValue(key);
  });

  return styleObj;
}

const ignoreAttrs = ['class', 'id', 'style'];
const datasetReg = /^data-.+/;

/**
 * 获取元素的属性
 *
 * @param node Element node
 * @returns {TAttributes}
 */
export function getAttrs(node: Element): TAttributes {
  const attrObj: TAttributes = {};
  const attrs = node.attributes;

  for (let i = 0; i < attrs.length; i++) {
    const attr: Attr = attrs[i];
    const nodeName = attr.nodeName as TTagAttribute;
    if (ignoreAttrs.includes(nodeName) || datasetReg.test(nodeName)) {
      attrObj[nodeName] = attr.nodeValue;
    }
  }

  return attrObj;
}

/**
 * 获取节点的位置、大小信息
 *
 * @export
 * @param {Element} node
 * @returns [X, Y, Width, Left]
 */
export function getRect(node: Element): TNodeRect {
  const rect = node.getBoundingClientRect();
  return [rect.left, rect.top, rect.width, rect.height]; // .map(Math.floor);
}


/**
 * 返回完整的 HTML 字符串
 * @param fragment HTML 片段
 * @param stylesheet css 片段
 */
export function htmlWrap(fragment: string, stylesheet: string): string {
  // 数组更美观
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <meta http-equiv="X-UA-Compatible" content="ie=edge">',
    '  <title>Document</title>',
    '  <link href="https://cdn.bootcss.com/normalize/8.0.1/normalize.min.css" rel="stylesheet">',
    '  <style id="inject-style">',
    `    ${stylesheet}`,
    '  </style>',
    '</head>',
    '<body>',
    `    ${fragment}`,
    '</body>',
    '</html>'].join('\n');
}
