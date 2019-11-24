/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
import { IRenderNode, NodeType } from '@feoj/common/types/domCore';
import { createEmptyNode, createTextNode } from '@feoj/common/utils/difference.utils';
// import cloneDeep from 'lodash/fp/cloneDeep';
import { getAttrs, getStyle, getRect } from './utils';
import { IGenerateRenderTreeOptions, mergeWithDefaultConfig } from './config';

/**
 * Depth-first traversal
 *
 * @param {Element} domNode
 * @param {IRenderNode} renderNode
 */
function DFT(
  domNode: Element,
  renderNode: IRenderNode,
  config: IGenerateRenderTreeOptions,
): void {
  if (domNode.nodeType === NodeType.ELEMENT_NODE) {
    renderNode.id = domNode.id;
    const tagName = renderNode.tagName = domNode.tagName;
    renderNode.className = domNode.className;
    renderNode.nodeType = NodeType.ELEMENT_NODE;

    renderNode.attr = getAttrs(domNode);
    renderNode.style = getStyle(domNode);
    renderNode.rect = getRect(domNode);

    if (!config.noChildElement.includes(tagName)) {
      const children = domNode.childNodes;
      renderNode.children = [];
      for (let i = 0; i < children.length; i++) {
        const childNode = children[i] as Element;
        if (childNode.nodeType === NodeType.TEXT_NODE) {
          const text = childNode.nodeValue.trim();
          if (text) { // 排除空串
            const textChild = createTextNode(text);
            renderNode.children.push(textChild);
          }
        } else {
          const renderChild = createEmptyNode(tagName);
          renderNode.children.push(renderChild);
          DFT(childNode, renderChild, config);
        }
      }
    }
  } else if (domNode.nodeType === NodeType.TEXT_NODE) {
    renderNode.nodeType = NodeType.TEXT_NODE;
    renderNode.text = domNode.nodeValue;
  }
}

export function genRenderTree(body: Element, config: IGenerateRenderTreeOptions = {}): IRenderNode {
  const root = createEmptyNode();
  mergeWithDefaultConfig(config);
  DFT(body, root, config);
  return root;
}
