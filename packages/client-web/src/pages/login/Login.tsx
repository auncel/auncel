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

const Login: React.FC = () => {
  loginReq();

  return (
    <div className={styles.loginBg}>
      <div className={styles.loginBox}>
        <div>login</div>
      </div>
    </div>
  );
};

export default Login;
