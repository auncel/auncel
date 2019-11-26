# Rules

> QT(question tree)是标准答案的 Render Tree，AT（answer tree）用户提交的 Render Tree

+ z-index 不比较数值，只比较大小
+ AT/QT attr 的不一致
  + AT 允许多余的 attr
  + 只检查宽关键的 attr？如：alt，placeholder，checked，type，target，name...
