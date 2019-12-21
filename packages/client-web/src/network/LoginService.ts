/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 15th December 2019 10:34 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 15th December 2019 10:34 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
/* eslint-disable constructor-super */
/* eslint-disable no-empty-function */

import 'reflect-metadata';
import { Injectable } from 'injection-js';
import HttpRequest from './HttpRequest';
import HostMap from './hostMap';

export type IUserParams = Record<'usernameOrEmail' | 'password', string>;

@Injectable()
export default class LoginService extends HttpRequest {
  baseURL = HostMap.UserCenter;

  login<T>(data: IUserParams): Promise<T> {
    return this.post<T>(data).then(resp => resp.data);
  }
}
