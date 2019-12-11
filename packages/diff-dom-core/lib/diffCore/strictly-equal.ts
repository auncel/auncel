/* --------------------------------------------------------------------------*
* Description: 实现 Dom 树的严格比较                                         *
*                                                                           *
* File Created: Monday, 25th November 2019 10:43 pm                         *
* Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
*                                                                           *
* Last Modified: Tuesday, 26th November 2019 9:44 pm                        *
* Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
*                                                                           *
* Copyright 2019 - 2019 Mozilla Public License 2.0 License                                         *
*-------------------------------------------------------------------------- */

import { isEqual } from 'lodash';
import {
  IRenderNode, IDiffNode, IDistinctionDetail, DistinctionType, DiffType,
  NodeType, TAttrPropertyType, TCSSPropertyValueType, TNodeRect,
} from '@feoj/common/types/domCore';
import { IStrictlyEqualAttrOption, IStrictlyEqualOption, IStrictlyEqualStyleOption } from 'lib/config';
import { distinctionCompare, createDistinction } from './utils';
import { strictlyEqualOption } from '../config';
import { TStyleProps } from '@feoj/common/types/css';

/* eslint-disable no-param-reassign */

function isElementType(element: IRenderNode): boolean {
  return element.nodeType === NodeType.ELEMENT_NODE;
}

function identifyAttrDistinction(
  leftNode: IRenderNode, rightNode: IRenderNode, attrConfig: IStrictlyEqualAttrOption,
): IDistinctionDetail<TAttrPropertyType>[] {
  if (Array.isArray(attrConfig.list)) {
    return distinctionCompare<TAttrPropertyType>(leftNode.attr, rightNode.attr, attrConfig.list);
  }

  const distinctions: IDistinctionDetail<TAttrPropertyType>[] = distinctionCompare<TAttrPropertyType>(
    leftNode.attr, rightNode.attr, Object.keys(leftNode.attr),
  );

  if (attrConfig.isStrictlyEqual) {
    return distinctions;
  }

  return distinctions.filter(distinction => distinction.type === DistinctionType.EXTRA);
}

/** TODO: styleConfig */
function identifyStyleDistinction(
  leftNodeStyle: TStyleProps, rightNodeStyle: TStyleProps, styleConfig: IStrictlyEqualStyleOption,
): IDistinctionDetail<TCSSPropertyValueType>[] {
  const keys = Object.keys(leftNodeStyle);
  const distinctions = distinctionCompare<TCSSPropertyValueType>(
    leftNodeStyle, rightNodeStyle, keys,
  );
  return distinctions;
}

function identifyRectDistinction(
  leftRect: TNodeRect, rightRect: TNodeRect, rectTolerance: number,
): IDistinctionDetail<number>[] {
  const distinctions = distinctionCompare<number>(
    leftRect, rightRect, ['left', 'top', 'width', 'height'],
    (leftValue, rightValue) => Math.abs(leftValue - rightValue) <= rectTolerance,
  );

  return distinctions;
}

function isStyleEqual(node1: IRenderNode, node2: IRenderNode): boolean {
  return isEqual(node1.style, node2.style);
}

function getNodeLocal(node: IRenderNode): string {
  const buff = [node.tagName.toLowerCase()];
  if (node.id) buff.push(`#${node.id}`);
  if (node.className) buff.push('.', node.className.split(' ').join('.'));
  return buff.join('');
}

function createDiffNode(): IDiffNode {
  return {
    type: DiffType.None,
    location: '',
  };
}

/**
 * Depth-first traversal
 *
 * @param {IRenderNode} left
 * @param {IRenderNode} right
 */
function strictEqualDeepFirstTraversal(
  left: IRenderNode, right: IRenderNode, diffNode: IDiffNode, config: IStrictlyEqualOption,
): void {
  if (isElementType(left) && isElementType(right)) {
    diffNode.location = getNodeLocal(right);

    if (config.isTagStrictlyEqaul) {
      if (left.nodeName !== right.nodeName) {
        diffNode.type |= DiffType.Tag;
        diffNode.tagName = createDistinction<string>(
          'tagName',
          DistinctionType.INEQUAL,
          left.nodeName,
          right.nodeName,
        );
      }
    }

    if (config.isIdStrictlyEqual) {
      if (left.id && right.id && left.id !== right.id) {
        diffNode.type |= DiffType.Id;
        diffNode.id = createDistinction<string>(
          'id',
          DistinctionType.INEQUAL,
          right.id,
          left.id,
        );
      }
    }

    if (config.isClassStrictlyEqual) {
      if (left.className !== right.className) {
        diffNode.type |= DiffType.ClassName;
        diffNode.className = createDistinction<string>(
          'className',
          DistinctionType.INEQUAL,
          left.className,
          right.className,
        );
      }
    }

    const attrDisctinctions = identifyAttrDistinction(left, right, config.attrs);
    if (attrDisctinctions.length !== 0) {
      diffNode.type |= DiffType.Attr;
      diffNode.attr = attrDisctinctions;
    }

    const styleDistinctions = identifyStyleDistinction(left.style, right.style, config.style);
    if (!isStyleEqual(left, right)) {
      diffNode.type |= DiffType.Style;
      diffNode.style = styleDistinctions;
    }

    const rectDistinction = identifyRectDistinction(left.rect, right.rect, config.rectTolerance);
    if (rectDistinction.length) {
      diffNode.rect = rectDistinction;
    }

    // TODO: 更多地判断：一个有孩子，一个没孩纸；孩子个数不一致
    if (left.children && left.children.length && right.children && right.children.length) {
      diffNode.children = [];
      for (let i = 0; i < left.children.length; i++) {
        const emptyNode = createDiffNode();
        diffNode.children.push(emptyNode);
        strictEqualDeepFirstTraversal(left.children[i], right.children[i], emptyNode, config);
      }
    }
  } else if (left.nodeType === NodeType.TEXT_NODE && right.nodeType === NodeType.TEXT_NODE) {
    if (left.text !== right.text) {
      diffNode.type |= DiffType.Text;
      diffNode.text = createDistinction(
        'text',
        DistinctionType.INEQUAL,
        left.text,
        right.text,
      );
    }
  } else {
    diffNode.type |= DiffType.NodeType;
    diffNode.nodeType = createDistinction(
      'nodeType',
      DistinctionType.INEQUAL,
      left.nodeType,
      right.nodeType,
    );
  }
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
  strictEqualDeepFirstTraversal(exemplar, instance, diffRoot, strictlyEqualOption);
  return diffRoot;
}
