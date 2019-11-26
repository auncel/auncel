/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 26th November 2019 10:28 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 26th November 2019 10:28 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 MIT License                                         *
 *-------------------------------------------------------------------------- */

import { isEqual } from 'lodash';

export type Comparator = (object: object, comparison: object, keys: string[]) => ICompareResult;

export interface ICompareResultItem {
  key: string;
  expect?: number | string | object;
  actual?: number | string | object;
}

export interface ICompareResult {
  misson: ICompareResultItem[];
  inequality: ICompareResultItem[];
  extra: ICompareResultItem[];
}

/**
 * 比较两个对象的指定的 keys 的属性是否相同
 * @param object 被比较物
 * @param comparison 比较物
 * @param keys 比较的 key
 */
export function objectCompare(object: object, comparison: object, keys: string[]): ICompareResult {
  const res: ICompareResult = {
    misson: [],
    inequality: [],
    extra: [],
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    const isObjectKeyExist = typeof object[key] !== 'undefined';
    const isComparisonKeyExist = typeof comparison[key] !== 'undefined';
    if (isObjectKeyExist && isComparisonKeyExist) {
      if (!isEqual(object[key], comparison[key])) { // 浅比较
        res.inequality.push({
          key,
          expect: object[key],
          actual: comparison[key],
        });
      } // else 相等
    } else if (isObjectKeyExist && !isComparisonKeyExist) {
      res.misson.push({
        key,
        expect: object[key],
      });
    } else if (!isObjectKeyExist && isComparisonKeyExist) {
      res.misson.push({
        key,
        actual: comparison[key],
      });
    } // !isObjectKeyExist && !isComparisonKeyExist
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(comparison)) {
    if (!keys.includes(key)) {
      res.extra.push({
        key,
        actual: comparison[key],
      });
    }
  }

  return res;
}
