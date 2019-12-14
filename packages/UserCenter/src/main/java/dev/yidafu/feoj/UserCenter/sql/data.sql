use oj_user;

INSERT INTO roles VALUES (
  1,
  'admin',
  '超级管理员'
);

INSERT INTO roles VALUES (
  2,
  "questionSetter",
  "出题人"
);

INSERT INTO roles VALUES (
  3,
  'anwser',
  '回答者'
);

INSERT into users (
  id, 
  nickname,
  realname,
  mobile,
  password,
  email,
  avatar,
  status,
  role,
  login_count
) VALUES (
  1,
  '出题人（测试）',
  '出题',
  '12345678901',
  'password',
  'admi@oj.test',
  'http://job.linagora.com/wp-content/uploads/2018/09/user-male-icon.png',
  0,
  2,
  0
);

INSERT into users  (
  id, 
  nickname,
  realname,
  mobile,
  password,
  email,
  avatar,
  status,
  role,
  login_count
) VALUES (
  2,
  '小白鼠',
  '小白',
  '12345678902',
  'banabana',
  'xiaobai@oj.test',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Ic_person_48px.svg/768px-Ic_person_48px.svg.png',
  0,
  2,
  0
);

INSERT into users (
  id, 
  nickname,
  realname,
  mobile,
  password,
  email,
  avatar,
  status,
  role,
  login_count
) VALUES (
  2,
  '金丝雀',
  '金丝',
  '12345678903',
  'banabana',
  'jinsi@oj.test',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Ic_person_48px.svg/768px-Ic_person_48px.svg.png',
  0,
  3,
  0
);


