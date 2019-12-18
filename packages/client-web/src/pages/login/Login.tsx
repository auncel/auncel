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
import React from 'react';
import PropTypes from 'prop-types';
import useForm from 'react-hook-form';
import styles from './styles.module.scss';
import { loginReq } from '../../network';
import loginSidePng from '../../assets/images/login-side.png';

const Login: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: object): void => {
    console.log(data);
  };

  return (
    <div className={styles.loginBg}>
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <div className={styles.loginLeft}>
            <img src={loginSidePng} />
          </div>
          <div className={styles.loginRight}>
            <form onSubmit={handleSubmit(onSubmit)} method="POST">
              <h2>登录</h2>
              <input
                name="usernameOrEmail"
                ref={register({
                  required: { value: true, message: '用户名或邮箱必填' },
                  pattern: { value: /\w+/, message: '格式不正确' },
                })}
              />
              {errors.usernameOrEmail
                && <span className={styles.inputError}>
                  {errors.usernameOrEmail.message}
                </span>
              }
              <input
                name="password"
                ref={register({
                  required: { value: true, message: '密码必填' },
                  pattern: { value: /\w+/, message: '格式不正确' },
                })}
              />
              {errors.password
                && <span className={styles.inputError}>
                  {errors.password.message}
                </span>
              }
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
