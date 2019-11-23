import { IRenderNode, NodeType } from '@feoj/common/types/difference.interface';
import { createEmptyNode, createTextNode } from '@feoj/common/utils/difference.utils';
// import cloneDeep from 'lodash/fp/cloneDeep';
import { getAttrs, getStyle, getRect } from './utils';


export function genRenderTree(body: Element): IRenderNode {
  const root = createEmptyNode();
  console.log('DFT start');
  DFT(body, root);
  return root;
}

const noChildElement = [
  'IMG', 'CANVAS', 'INPUT', 'TEXTAREA', 'AUDIO',
  'VIDEO', 'HR', 'EMBED', 'OBJECT', 'PROGRESS',
];

const ignoreElement = [
  'SCRIPT', 'STYLE',
];

/**
 * Depth-first traversal
 *
 * @param {Element} domNode
 * @param {IRenderNode} renderNode
 */
function DFT(domNode: Element, renderNode: IRenderNode) {
  // debugger;
  if (domNode.nodeType === NodeType.ELEMENT_NODE) {
    renderNode.id = domNode.id;
    const tagName = renderNode.tagName = domNode.tagName;
    renderNode.className = domNode.className;
    renderNode.nodeType = NodeType.ELEMENT_NODE;

    renderNode.attr = getAttrs(domNode);
    renderNode.style = getStyle(domNode);
    renderNode.rect = getRect(domNode);

    if (noChildElement.includes(tagName)) {

    } else {
      const children = domNode.childNodes;
      renderNode.children = [];
      for (let i = 0; i < children.length; i++) {
        const childNode = children[i] as Element;
        if (!ignoreElement.includes(childNode.tagName)) {
          if (childNode.nodeType === NodeType.TEXT_NODE) {
            const text = childNode.nodeValue.trim();
            if (text) {
              const textChild = createTextNode(text);
              renderNode.children.push(textChild);
            }
          } else {
            const renderChild = createEmptyNode(tagName);
            renderNode.children.push(renderChild);
            DFT(childNode, renderChild);
          }
        }
      }
    }
  } else if (domNode.nodeType === NodeType.TEXT_NODE) {
    renderNode.nodeType = NodeType.TEXT_NODE;
    renderNode.text = domNode.nodeValue;
  }
}
