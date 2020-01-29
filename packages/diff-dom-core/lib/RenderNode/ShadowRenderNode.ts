/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 18th January 2020 2:37 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 18th January 2020 2:37 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import ElementRenderNode from './ElementRenderNode';
import RenderNode from './RenderNode';

export enum ShadowDiffType {
  SHADOW_NODE = 0b1,
  SHADOW_CHILDREN = 0b10,
}

export default class ShadowRenderNode extends RenderNode {
  public diffType;
  public shadowNode: RenderNode = null;
  public shadowChildren: RenderNode[];

  constructor(renderNode: RenderNode) {
    super();
    Object.assign(this, renderNode);
  }
}
