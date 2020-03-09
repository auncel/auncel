/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 21st December 2019 11:35 am                       *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 21st December 2019 11:35 am                      *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import LoginService from './LoginService';
import 'reflect-metadata';
import { ReflectiveInjector, Injectable, Injector, } from 'injection-js';
import HttpRequest from './HttpRequest';
 
export const injector = ReflectiveInjector.resolveAndCreate([LoginService, HttpRequest]);

describe('DI', () => {
  test('di works', () => {
    const loginService = injector.get(LoginService)
    loginService.login();
    expect(true)
  });
});