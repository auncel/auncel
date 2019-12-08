/**
 * @jest-environment jsdom
 */

/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 24th November 2019 1:07 am                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 7th December 2019 9:35 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 MIT License                                         *
 *-------------------------------------------------------------------------- */

import { generateRenderTree } from './generateRenderTree';
import { readFixtures, readFixture, IFixture, IFixtureData } from '../../fixtures/readFixture';
import { parseCSS } from '../CSSTree/parseCSS';
import { USER_STYLE_ID } from '../const';
import { IRenderNode } from '@feoj/common/types/domCore';
import { computeElementStyle } from './getCSSPropertyValues';

function getRenderTree(fixture: IFixtureData): IRenderNode {
  if (!fixture) return null;
  const { fragment, stylesheet, } = fixture;
  let $userStyle = document.getElementById(USER_STYLE_ID);
  if (!$userStyle) {
    $userStyle = document.createElement('style');
    $userStyle.id = USER_STYLE_ID;
    document.head.appendChild($userStyle);
  }

  $userStyle.innerHTML = stylesheet;
  window.elementPropertyMap = computeElementStyle(document);
  document.body.innerHTML = fragment;
  const tree = generateRenderTree(document.body);
  return tree;
}

let question: IFixtureData = null;
let answers: IFixtureData[] = null;
beforeAll(() => {
  jest.setTimeout(10_000);
  return readFixtures(__dirname + '/../../fixtures/elements/button/bootstrap/')
    .then(fixtrues => {
    question = fixtrues.question;
    answers = fixtrues.answers;
    return null;
  });
}, 10_000);

describe('bootstrap', () => {
  test(`button`, () => {
  const questionTree = getRenderTree(question as IFixtureData);
  for (const answer of answers) {
    const answerTree = getRenderTree(answer as IFixtureData);
      expect(questionTree).toEqual(answerTree);
    }
  });
});