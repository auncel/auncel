/* --------------------------------------------------------------------------*
* Description: 实现 Dom 树的严格比较                                         *
*                                                                           *
* File Created: Monday, 25th November 2019 10:43 pm                         *
* Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
*                                                                           *
* Last Modified: Tuesday, 26th November 2019 9:44 pm                        *
* Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
*                                                                           *
* Copyright 2019 - 2019 MIT License                                         *
*-------------------------------------------------------------------------- */

import { isEqual } from 'lodash';
import { IRenderNode, IDiffNode, DiffType, NodeType } from '@feoj/common/types/domCore';
import { IStrictlyEqualAttrOption } from 'lib/config';

/* eslint-disable no-param-reassign */

function isElementType(element: IRenderNode): boolean {
  return element.nodeType === NodeType.ELEMENT_NODE;
}
/**
 * 比较标签是否相同
 *
 * @param {IRenderNode} node1
 * @param {IRenderNode} node2
 * @returns {boolean}
 */
function isTagEqual(node1: IRenderNode, node2: IRenderNode): boolean {
  return node1.nodeName === node2.nodeName;
}

function identifyAttrDifference(
  node1: IRenderNode, node2: IRenderNode, attrConfig: IStrictlyEqualAttrOption,
): boolean {
  if (Array.isArray(attrConfig.list)) {
    
  }

  return isEqual(node1.attr, node2.attr);
}

function isStyleEqual(node1: IRenderNode, node2: IRenderNode): boolean {
  return isEqual(node1.style, node2.style);
}

function isRectEqual(node1: IRenderNode, node2: IRenderNode): boolean {
  return isEqual(node1.rect, node2.rect);
}

function getNodeLocal(node: IRenderNode): string {
  const buff = [node.tagName.toLowerCase()];
  if (node.id) buff.push(`#${node.id}`);
  if (node.className) buff.push(node.className.split(' ').join('.'));
  return buff.join('');
}

/**
 * Depth-first traversal
 *
 * @param {IRenderNode} left
 * @param {IRenderNode} right
 */
function strictEqualDeepFirstTraversal(
  left: IRenderNode, right: IRenderNode, diffNode: IDiffNode,
): void {
  // TODO: 封装这一步的类型检查
  if (isElementType(left) && isElementType(right)) {
    diffNode.location = getNodeLocal(right);
    if (isTagEqual(left, right)) {
      if (!identifyAttrDifference(left, right)) {
        diffNode.type |= DiffType.Attr;
        diffNode.attr = {
          exemplar: left.attr,
          instance: right.attr,
        };
      }

      if (left.id !== right.id) {
        diffNode.type |= DiffType.Id;
        diffNode.id = {
          exemplar: left.id,
          instance: right.id,
        };
      }

      if (left.className !== right.className) {
        diffNode.type |= DiffType.ClassName;
        diffNode.className = {
          exemplar: left.className,
          instance: right.className,
        };
      }

      if (!isStyleEqual(left, right)) {
        diffNode.type |= DiffType.Style;
        diffNode.style = {
          exemplar: left.style,
          instance: right.style,
        };
      }

      if (!isRectEqual(left, right)) {
        diffNode.type |= DiffType.Rect;
        diffNode.rect = {
          exemplar: left.rect,
          instance: right.rect,
        };
      }

      // TODO: 更多地判断：一个有孩子，一个没孩纸；孩子个数不一致
      if (left.children && left.children.length && right.children && right.children.length) {
        diffNode.children = [];
        for (let i = 0; i < left.children.length; i++) {
          const emptyNode = createDiffNode();
          diffNode.children.push(emptyNode);
          strictEqualDeepFirstTraversal(left.children[i], right.children[i], emptyNode);
        }
      }
    } else {
      diffNode.type |= DiffType.Tag;
      diffNode.tagName = {
        exemplar: left.tagName,
        instance: right.tagName,
      };
    }
  } else if (left.nodeType === NodeType.TEXT_NODE && right.nodeType === NodeType.TEXT_NODE) {
    if (left.text !== right.text) {
      diffNode.type |= DiffType.Text;
      diffNode.text = {
        exemplar: left.text,
        instance: right.text,
      };
    }
  } else {
    diffNode.type |= DiffType.NodeType;
    diffNode.nodeType = {
      exemplar: left.nodeType,
      instance: right.nodeType,
    };
  }
}

function createDiffNode(): IDiffNode {
  return {
    type: DiffType.None,
    location: '',
  };
}

/**
 *
 *
 * @export
 * @param {IRenderNode} exemplar 样例输入
 * @param {IRenderNode} instance 实际输入
 */
export function strictEqualDiff(exemplar: IRenderNode, instance: IRenderNode): IDiffNode {
  const diffRoot = createDiffNode();
  strictEqualDeepFirstTraversal(exemplar, instance, diffRoot);
  return diffRoot;
}
