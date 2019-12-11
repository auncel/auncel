/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 26th November 2019 10:28 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 26th November 2019 10:28 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0 License                  *
 *-------------------------------------------------------------------------- */

import { isEqual } from 'lodash';
import { IDistinctionDetail, DistinctionType, TDistinctionType } from '@feoj/common/types/domCore';

export function createDistinction<T>(
  key: string, type: TDistinctionType, expect?: T, actual?: T,
): IDistinctionDetail<T> {
  return {
    key,
    type,
    expect,
    actual,
  };
}

export type Comparator = <T>(
  object: object, comparison: object, keys: string[],
) => IDistinctionDetail<T>[];

/**
 * 比较两个对象的指定的 keys 的属性是否相同
 * @param object 被比较物
 * @param comparison 比较物
 * @param keys 比较的 key
 * @param isEualFn 是否相等的比较函数
 */
export function distinctionCompare<T>(
  object: object, comparison: object, keys: string[], isEqualFn = isEqual,
): IDistinctionDetail<T>[] {
  const res: IDistinctionDetail<T>[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    const isObjectKeyExist = typeof object[key] !== 'undefined';
    const isComparisonKeyExist = typeof comparison[key] !== 'undefined';
    if (isObjectKeyExist && isComparisonKeyExist) {
      if (!isEqualFn(object[key], comparison[key])) { // 浅比较
        res.push(
          createDistinction<T>(
            key,
            DistinctionType.INEQUAL,
            object[key],
            comparison[key],
          ),
        );
      } // else 相等
    } else if (isObjectKeyExist && !isComparisonKeyExist) {
      res.push(
        createDistinction<T>(
          key,
          DistinctionType.MISSING,
          object[key],
        ),
      );
    } else if (!isObjectKeyExist && isComparisonKeyExist) {
      res.push(
        createDistinction<T>(
          key,
          DistinctionType.MISSING,
          null,
          comparison[key],
        ),
      );
    } // !isObjectKeyExist && !isComparisonKeyExist
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(comparison)) {
    if (!keys.includes(key)) {
      res.push(
        createDistinction<T>(
          key,
          DistinctionType.EXTRA,
          null,
          comparison[key],
        ),
      );
    }
  }

  return res;
}
