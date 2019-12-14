DROP DATABASE if EXISTS `oj_user`;

CREATE DATABASE IF NOT EXISTS  `oj_user`;

use `oj_user`;

create table if not exists `oj_user`.`roles` (
  id INT PRIMARY KEY,
  role_name VARCHAR(50),
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
    status int default 0, -- 0,登出; 1,登录; 2,暂时锁定
    role int default 2,
    login_count TINYINT default 0, -- 30 分钟密码错误次数
    register_time timestamp default CURRENT_TIMESTAMP,
    last_login_time timestamp NULL default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT oj_user_users_role FOREIGN KEY (role) REFERENCES roles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `oj_user`.`register_logs` (
  id INT PRIMARY KEY,
  -- user_id INT,
  register_time TIMESTAMP default CURRENT_TIMESTAMP,
  register_ip VARCHAR(15),
  message Text
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `oj_user`.`login_logs` (
  id int PRIMARY KEY,
  user_id int,
  login_time TIMESTAMP default CURRENT_TIMESTAMP,
  login_ip VARCHAR(15), -- xxx.xxx.xxx.xxx
  type TINYINT, -- 登录，登出
  message Text,
  CONSTRAINT oj_user_login_logs_user_id FOREIGN KEY (user_id) REFERENCES users(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `oj_user`.`authentications` (
    id int PRIMARY key,
    user_id INT,
    app_type int,
    app_user_id VARCHAR(100),
    access_token VARCHAR(200),
    CONSTRAINT oj_user_authentications_user_id FOREIGN KEY (user_id) REFERENCES users(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
