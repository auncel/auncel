/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 20th December 2019 9:53 pm                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 20th December 2019 9:53 pm                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
interface IPlainObject<V> {
  [key: string]: V;
}
// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface Map<K, V> {
  toJSON(): IPlainObject<V>;
}

// eslint-disable-next-line no-extend-native
Map.prototype.toJSON = function toJSON(...args): IPlainObject<any> {
  // const entries = this.entries();
  // const obj: IPlainObject = {};
  // for (let index = 0; index < entries.length; index++) {
  //   const [key, value] = entries[index];
  //   obj[key] = value;
  // }
  return Object.fromEntries(this);
};

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface Set<T> {
  toJSON(): T[];
}

// eslint-disable-next-line no-extend-native
Set.prototype.toJSON = function toJSON(): any[] {
  const values = this.values();
  const array = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const value of values) {
    array.push(value);
  }
  return array;
};
