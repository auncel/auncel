/* --------------------------------------------------------------------------*
 * Filename: d:\Project\fe-oj\packages\client-web\src\routes\index.js        *
 * Path: d:\Project\fe-oj\packages\client-web                                *
 * Created Date: Sunday, December 15th 2019, 9:55:39 pm                      *
 * Author: yidafu(dov-yih)                                                   *
 *                                                                           *
 * Copyright (c) 2019 None                                                   *
 *-------------------------------------------------------------------------- */
import { lazy } from 'react';

const Login = lazy(() => import('./login/Login'));

export default [
  {
    title: '登录',
    path: '/login',
    components: Login,
  },
]
;
