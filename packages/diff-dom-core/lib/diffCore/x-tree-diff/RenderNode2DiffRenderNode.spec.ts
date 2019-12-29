/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 29th December 2019 1:23 pm                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 29th December 2019 1:23 pm                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { renderNode2DiffRenderNode } from './RenderNode2DiffRenderNode'
const diffTree = require('../../../fixtures/render/diff-tree.json');

describe('renderNode2DiffRenderNode', () => {
  test('fixtures/render/diff-tree.json', () => {
    const diffRenderNode = renderNode2DiffRenderNode(diffTree)
    expect(diffRenderNode.actual).toBe(diffTree);
  });
});
