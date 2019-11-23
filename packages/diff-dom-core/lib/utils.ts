import { TAttributes, TTagAttribute } from '@feoj/common/types/difference.interface';
import { tokenize, TokenType } from '@feoj/common/css/tokenize';

const stylePrototypeWhiteList = [
  'font-size',
  'font-style',
  'border-color',
  'background',
];

export function getStyle(node: Element) {
  const styleObj = {};
  const style = getComputedStyle(node);
  const properties = getStyleProperties();
  properties.forEach((key) => {
    styleObj[key] = style.getPropertyValue(key);
  });

  return styleObj;
}

const ignoreAttr = ['class', 'id', 'style'];
const datasetReg = /^data-.+/;

/**
 *
 * @param node Element node
 */
export function getAttrs(node: Element) {
  const attrObj: TAttributes = {};
  const attrs = node.attributes;

  for (let i = 0; i < attrs.length; i++) {
    const attr: Attr = attrs[i];
    const nodeName = attr.nodeName as TTagAttribute;
    if (ignoreAttr.includes(nodeName) || datasetReg.test(nodeName)) {
      attrObj[nodeName] = attr.nodeValue;
    }
  }

  return attrObj;
}

/**
 *
 *
 * @export
 * @param {Element} node
 * @returns [X, Y, Width, Left]
 */
export function getRect(node: Element): [number, number, number, number] {
  const rect = node.getBoundingClientRect();
  // @ts-ignore
  return [rect.left, rect.top, rect.width, rect.height].map(Math.floor);
}

let properties: string[];
function getStyleProperties(): string[] {
  if (!properties) {
    const stylesheet = document.querySelector('#inject-style').innerHTML;
    const tokens = tokenize(stylesheet);
    properties = tokens.filter(t => t.type === TokenType.Property).map(t => t.value);
  }
  return properties;
}

export function htmlWrap(fragment: string, stylesheet: string) {
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
