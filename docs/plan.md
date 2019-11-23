# Plan

## DOM Core

### DOM 全等比较

DOM 的全等比较，先不考虑 DOM 节点冗余的情况，保证 DOM 一致。

+ `absoluteLocation`配置 DOM 节点是否根据绝对定位比较
+ 排除不支持，不常用的 CSS 属性
+ 实现第一版评分算法（配置化评分标准）

### DOM 不一致

+ 验证【四叉树】是否可行
+ 找出所有 DOM 冗余的情况，看是否能够跳过

## Pixel Core

+ 查找图像对比算法

## 后端

+ Nest/Spring boot
