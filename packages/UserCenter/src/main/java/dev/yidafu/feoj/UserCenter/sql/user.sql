DROP DATABASE if EXISTS `oj_user`;

CREATE DATABASE IF NOT EXISTS  `oj_user`;

use `oj_user`;

create table if not exists `oj_user`.`roles` (
  id INT PRIMARY KEY,
  roleName VARCHAR(50),
  comment varchar(150)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `oj_user`.`users` (
    id int not null primary key,
    nickname varchar(50)  not null,
    realname varchar(50) default '',
    mobile varchar(11) default '',
    password varchar(200) default '',
    email varchar(100) DEFAULT '',
    avatar VARCHAR(300),
    status int default 0 comment ' 0,登出; 1,登录; 2,暂时锁定', --  0,登出; 1,登录; 2,暂时锁定
    role int default 2,
    loginCount TINYINT default 0, -- 30 分钟密码错误次数
    registerTime timestamp default CURRENT_TIMESTAMP,
    lastLoginTime timestamp NULL default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT oj_user_users_role FOREIGN KEY (role) REFERENCES roles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `oj_user`.`register_logs` (
  id INT PRIMARY KEY,
  -- user_id INT,
  registerTime TIMESTAMP default CURRENT_TIMESTAMP,
  registerTp VARCHAR(15),
  message Text
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `oj_user`.`login_logs` (
  id int PRIMARY KEY,
  userId int,
  loginTime TIMESTAMP default CURRENT_TIMESTAMP,
  loginIp VARCHAR(15), -- xxx.xxx.xxx.xxx
  type TINYINT, -- 登录，登出
  message Text,
  CONSTRAINT oj_user_login_logs_user_id FOREIGN KEY (userId) REFERENCES users(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `oj_user`.`authentications` (
    id int PRIMARY key,
    userId INT,
    appType int,
    appUserId VARCHAR(100),
    accessToken VARCHAR(200),
    CONSTRAINT oj_user_authentications_user_id FOREIGN KEY (userId) REFERENCES users(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
