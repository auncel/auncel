/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 21st December 2019 5:22 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 21st December 2019 5:22 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { CSSProperties } from '../packages/common/const/css';

const ignoreProperty = ['color'];
export default function cssLogogram(): object {
  // 找出所有有子属性的 CSS 属性
  const logogram = CSSProperties.filter(p =>
    ((CSSProperties as unknown) as string[]).find((c: string) =>
      c.startsWith(`${p}-`) && !ignoreProperty.includes(c)),
  );

  const res = {};
  logogram.sort().forEach((l) => {
    let props = CSSProperties.filter(c =>
      c.startsWith(`${l}-`),
    );
    const anthorLogogram = props.filter(p => logogram.includes(p));
    props = props.filter(p => !anthorLogogram.find(a => p.startsWith(a)));

    // 只有 longhand properties 个数不小于 2 才是 shorthand properties
    if (props.length > 1) {
      res[l] = props;
    }
  });

  return res;
}
