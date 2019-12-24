/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 24th December 2019 10:50 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 24th December 2019 10:50 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { IRenderNode, NodeType } from '@surpass/common/types/domCore';

export default function getLeafs(nodes: IRenderNode[]): IRenderNode[] {
  function getNodeLeafs(node: IRenderNode): IRenderNode[] {
    if (node.nodeType === NodeType.TEXT_NODE) {
      return [node];
    } else if (node.children && node.children.length === 0) {
      return [node];
    }
    return node.children.reduce((acc: IRenderNode[], node): IRenderNode[] => {
      acc.push(...getNodeLeafs(node));
      return acc;
    }, []);
  }

  return nodes.reduce((acc, node) => {
    acc.push(...getNodeLeafs(node));
    return acc;
  }, []);
}
