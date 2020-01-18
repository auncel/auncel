/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 28th December 2019 5:41 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 28th December 2019 5:41 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
/* eslint-disable class-methods-use-this */

import { NodeType, IRenderNode } from '../../renderNode/domCore';
// why???
import {
  XTreeDiff, XTree, NodeType as XTreeNodeType, EditOption,
} from '../../../node_modules/@dovyih/x-tree-diff/dist/index';
import { IDiffRenderNode, RenderNodeDiffType, createDiffRenderNode } from './DiffRenderNode';

export default class RenderNodeXTreeDiff extends XTreeDiff<IDiffRenderNode> {
  public buildXTree(root: IDiffRenderNode): XTree {
    function diffRenderNode2XTree(
      diffNode: IDiffRenderNode, index: number,
    ): XTree {
      const node: IRenderNode = diffNode.actual;
      switch (node.nodeType) {
        case NodeType.ELEMENT_NODE: {
          const xTreeNode = new XTree({
            label: node.tagName, index, type: XTreeNodeType.ELEMENT, data: diffNode,
          });
          if (diffNode.children.length) {
            const children = diffNode.children;
            for (let i = 0; i < children.length; i++) {
              const child = children[i];
              const childXTreeNode = diffRenderNode2XTree(child, i);
              xTreeNode.append(childXTreeNode);
            }
          }
          return xTreeNode;
        }
        case NodeType.TEXT_NODE: {
          return new XTree({
            type: XTreeNodeType.TEXT, index, value: node.text, data: diffNode,
          });
        }
        default:
          throw TypeError(`Unkown NodeType: ${node.nodeType}`);
      }
    }
    return diffRenderNode2XTree(root, 1);
  }

  /**
   * 暂不考虑冗余节点的情况
   * @param {XTree} rootA
   */
  public dumpXTree<IDiffRenderNode>(
    rootA: XTree<IDiffRenderNode>,
  ): IDiffRenderNode {
    // const rootB = rootA.nPtr;
    const stack1 = [rootA];
    // const stack2: XTree[] = [rootB];
    while (stack1.length) {
      const nodeA = stack1.pop();
      // const renderNode = nodeA.data.actual;
      switch (nodeA.Op) {
        case EditOption.DEL: {
          this.setNodesDiffType(nodeA, RenderNodeDiffType.EXTRA);
          break;
        }
        case EditOption.INS: {
          this.setNodesDiffType(nodeA, RenderNodeDiffType.MISSING);
          break;
        }
        case EditOption.MOV: {
          // MOV means the node is equal, but its order not
          this.setNodesDiffType(nodeA, RenderNodeDiffType.INEQUAL);
          break;
        }
        case EditOption.UPD: {
          this.setNodesDiffType(nodeA, RenderNodeDiffType.INEQUAL);
        }
        default:
        // do nothing
      }

      if (nodeA.hasChildren()) {
        nodeA.forEach((node) => {
          stack1.push(node);
        });
      }
    }
    const rootB = rootA.nPtr;
    const stack2 = [rootB];

    while (stack2.length) {
      const nodeB = stack2.pop() as XTree;

      switch (nodeB.Op) {
        case EditOption.INS: {
          const pPtrB = nodeB.pPtr;
          const pPterA = pPtrB.nPtr;
          if (pPterA) {
            pPterA.data.children[nodeB.index] = createDiffRenderNode(null, nodeB.data.actual, RenderNodeDiffType.MISSING);
          }
          break;
        }
        case EditOption.DEL: {
          const pPtrB = nodeB.pPtr;
          const pPterA = pPtrB.nPtr as XTree<IDiffRenderNode>;
          pPterA.data.children[nodeB.index] = createDiffRenderNode(nodeB.data.actual, null, RenderNodeDiffType.EXTRA);
          break;
        }
        default:
          // do nothing
      }
      if (nodeB.hasChildren()) {
        nodeB.forEach((node) => {
          stack2.push(node);
        });
      }
    }
    return rootA.data;
  }

  private setNodesDiffType(
    node: XTree<IDiffRenderNode>, type: RenderNodeDiffType,
  ): void {
    if (node.nPtr) {
      node.data.expect = node.nPtr.data;
      node.data.type = type;
      node.data.visited = true;
    }
  }
}
