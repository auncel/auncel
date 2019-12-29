/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 29th December 2019 11:59 am                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 29th December 2019 11:59 am                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import RenderTreeXTreeDiff  from './RenderTreeXTreeDiff'
import { renderNode2DiffRenderNode } from './RenderNode2DiffRenderNode';
import { RenderNodeDiffType } from './DiffRenderNode';

const { div } = require('../../../fixtures/render/diff.json');


describe('RenderTreeXTreeDiff', () => {
  test('start', () => {
    const treeOld = renderNode2DiffRenderNode(div.origin);
    const treeNew = renderNode2DiffRenderNode(div.padding);
    const xTreeDiff = new RenderTreeXTreeDiff(treeOld, treeNew)
    const { newTree } = xTreeDiff.diff();
    expect(newTree.type).toBe(RenderNodeDiffType.EQUALITY);
    expect(newTree.children[0].type).toBe(RenderNodeDiffType.EQUALITY);
  });
});