import { TAttributes, TTagAttribute } from "@feoj/common/types/difference.interface";
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
  properties.forEach(key => {
    styleObj[key] = style.getPropertyValue(key);
  });

  return styleObj;
}

const ignoreAttr = ['class', 'id', 'style'];
const datasetReg =  /^data-.+/;

/**
 * 
 * @param node Element node
 */
export function getAttrs(node: Element) {
  const attrObj: TAttributes = {};
  const attrs = node.attributes;

  for (let i = 0; i < attrs.length; i++ ) {
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
  var rect = node.getBoundingClientRect();
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