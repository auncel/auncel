/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 15th December 2019 9:34 pm                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 15th December 2019 9:38 pm                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { loginReq } from '../../network';
import loginSidePng from '../../assets/images/login-side.png';

const Login: React.FC = () => {
  loginReq();

  return (
    <div className={styles.loginBg}>
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <div className={styles.loginLeft}>
            <img src={loginSidePng} />
          </div>
          <div className={styles.loginRight}>
            <form>
              <h2>登录</h2>
              <input />
              <input />
              <input type="submit" value="提交" />
              <div className={styles.loginFooter}>
                <span>注册</span>
                <span>登录</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
