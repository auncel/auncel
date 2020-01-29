/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 18th January 2020 1:42 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 18th January 2020 1:42 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { NodeType } from './domCore';
import { TTreeNodeCallback } from './TreeNode';
import RenderNode from './RenderNode';

export default class TextRenderNode extends RenderNode {
  text: string;
  tagName = '#text' as const;
  nodeType: NodeType.TEXT_NODE;

  constructor(text = '') {
    super();
    this.text = text;
  }

  hasChildren(): boolean {
    return false;
  }

  forEach(callback: TTreeNodeCallback): void {
    // noop
  }

  append(child: TextRenderNode): void {
    this.text += child.text;
  }
}
