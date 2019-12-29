/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 29th December 2019 11:02 am                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 29th December 2019 11:02 am                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { IRenderNode, ITreeNode } from '../../types/domCore';

export enum RenderNodeDiffType {
  EQUALITY,
  INEQUAL,
  MISSING,
  EXTRA,
}

export interface IDiffRenderNode extends ITreeNode {
  type: RenderNodeDiffType;
  actual: IRenderNode;
  expect: IRenderNode;
  visited: boolean;
  children: IDiffRenderNode[];
}

export function createDiffRenderNode(
  actual: IRenderNode, expect: IRenderNode = null, type: RenderNodeDiffType = RenderNodeDiffType.EQUALITY,
): IDiffRenderNode {
  return {
    actual,
    expect,
    type,
    visited: false,
    children: [],
  };
}
