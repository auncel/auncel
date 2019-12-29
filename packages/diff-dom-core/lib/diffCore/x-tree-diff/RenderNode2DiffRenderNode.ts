/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 29th December 2019 12:00 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 29th December 2019 12:00 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { IRenderNode } from '../../types/domCore';
import { IDiffRenderNode, createDiffRenderNode, RenderNodeDiffType } from './DiffRenderNode';

export function renderNode2DiffRenderNode(root: IRenderNode): IDiffRenderNode {
  const diffRoot = createDiffRenderNode(root);
  function traverse(node: IRenderNode, diffNode: IDiffRenderNode): IDiffRenderNode {
    if (node?.children?.length) {
      const diffChildren = node.children.map(child =>
        traverse(child, createDiffRenderNode(child)),
      );
      delete node.children; // 断开孩子引用
      diffNode.children.push(...diffChildren);
    }

    return diffNode;
  }

  return traverse(root, diffRoot);
}
