/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 8th December 2019 9:35 pm                           *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 8th December 2019 9:35 pm                          *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 MIT License                                         *
 *-------------------------------------------------------------------------- */
/* eslint-disable no-param-reassign */
import {
  IDiffNode,
  IDiffLog,
  DiffType,
  DistinctionType,
  TNodeRect,
  IDistinctionDetail,
  TCSSPropertyValueType,
} from '@feoj/common/types/domCore';

function getNodeLocation(node: IDiffNode): string {
  const buff = [];

  while (node) {
    buff.unshift(node.location);
    node = node.parent;
  }
  return buff.join(' ');
}

const NODE_TOTAL_SCORE = 100;
const ID_SCORE = 5;
const TAGNAME_SCORE = 5;
const CLASS_SCORE = 5;
const ATTR_SCORE = 5;
const RECT_SCORE = 20;
const STYLE_SCORE = 60;

const CSSPropertyValueInequalScore = -5;
const CSSPropertyValueMissingScore = -10;
const CSSPropertyValueExtragScore = 0;

function evaluateStyleSimlarity(styleDistinction: IDistinctionDetail<TCSSPropertyValueType>[], logs: string[]): number {
  let styleScore = 0;

  if (!styleDistinction && !styleDistinction.length) return styleScore;

  // eslint-disable-next-line no-restricted-syntax
  for (const distinction of styleDistinction) {
    switch (distinction.type) {
      case DistinctionType.INEQUAL:
        styleScore += CSSPropertyValueInequalScore;
        logs.push(
          `property incorrent. [${distinction.key}] expect: ${distinction.expect}, actual: ${distinction.actual}`,
        );
        break;
      case DistinctionType.MISSING:
        styleScore += CSSPropertyValueMissingScore;
        logs.push(`missing property: ${distinction.key}`);
        break;
      case DistinctionType.EXTRA:
        styleScore += CSSPropertyValueExtragScore;
        logs.push(`extra property: ${distinction.key}`);
        break;
      default:
        // noop
    }
  }
  return Math.max(styleScore, -STYLE_SCORE);
}

function evaluateRectSimlarity(
  rectDistinctions: IDistinctionDetail<number>[], logs: string[],
): number {
  let rectScore = 0;

  if (!rectDistinctions && !rectDistinctions.length) return rectScore;

  // eslint-disable-next-line no-restricted-syntax
  for (const distinction of rectDistinctions) {
    const distance = Math.abs(distinction.actual - distinction.expect);
    // shouldn't greater then (RECT_SCORE / 4)
    rectScore -= distance * Math.log2(distance + 1);

    switch (distinction.key) {
      case 'height':
      case 'width':
        logs.push(
          `incrorent ${distinction.key}. expect ${distinction.expect}px, but actual ${distinction.actual}px `,
        );
        break;
      case 'top':
      case 'left':
        logs.push(
          `relative position incrorent. ${distinction.key} expect ${distinction.expect}px, not ${distinction.actual}px`,
        );
        break;
      default:
    }
  }
  return Math.max(rectScore, -RECT_SCORE);
}

export interface IFixedScoringPointResult {
  score: number;
  logs: IDiffLog[];
}

/**
 * 只是位置信息的比较
 * TODO: 考虑文本节点
 * @export
 * @param {IDiffNode} root
 */
export function generateDiffResult(root: IDiffNode): IFixedScoringPointResult {
  const diffLog: IDiffLog[] = [];
  const stack: IDiffNode[] = [];
  stack.push(root);
  let totalScore = 0;
  let nodeCount = 0;
  // 非递归遍历
  while (stack.length) {
    const node = stack.pop();
    if (node) {
      nodeCount++;
      const nodeDiffLogs: string[] = [];
      let nodeScore = NODE_TOTAL_SCORE;
      // diff type is rect
      if (node.type & DiffType.Id) {
        nodeScore -= ID_SCORE;
        nodeDiffLogs.push(
          `incorent id. expect ${node.id.expect}, actual ${node.id.actual}`,
        );
      }

      if (node.type & DiffType.ClassName) {
        nodeScore -= CLASS_SCORE;
        nodeDiffLogs.push(
          `incorent class. expect ${node.id.expect}, actual ${node.id.actual}`,
        );
      }

      if (node.type & DiffType.Rect) {
        const rectScore = evaluateRectSimlarity(node.rect, nodeDiffLogs);
        nodeScore -= rectScore;
      }

      if (node.type & DiffType.Style) {
        const styleScore = evaluateStyleSimlarity(node.style, nodeDiffLogs);
        nodeScore += styleScore;
      }

      const logMsg: IDiffLog = {
        location: getNodeLocation(node),
        difference: nodeDiffLogs,
      };

      diffLog.push(logMsg);
      totalScore += nodeScore;
      // push children to stack
      if (node.children) {
        node.children.forEach((child) => {
          child.parent = node;
          stack.push(child);
        });
      }
    }
  }
  const score = totalScore / (nodeCount * 100);

  return {
    score,
    logs: diffLog,
  };
}
