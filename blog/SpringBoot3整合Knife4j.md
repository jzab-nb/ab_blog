---
id: springboot3+knife4j
slug: /springboot3+knife4j
title: SpringBoot3整合Knife4j
date: 2024-03-02
tags: [框架,工具,SpringBoot,Knife4j]
keywords: [框架,工具,SpringBoot,Knife4j]
---

## 导入对应版本的Knife4j依赖

```xml
<!-- https://doc.xiaominfo.com/knife4j/documentation/get_start.html-->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-openapi3-jakarta-spring-boot-starter</artifactId>
    <version>4.4.0</version>
</dependency>
```

## 进行配置

```yaml
springdoc:
  swagger-ui:
  	// 原始swagger的路径
    path: /swagger.html
    tags-sorter: alpha
    operations-sorter: alpha
  api-docs:
  	// api文档地址
    path: /v3/api-docs
  group-configs:
    - group: 'default'
      paths-to-match: '/**'
      // 包扫描路径
      packages-to-scan: xyz.jzab.oj.controller
// 启用knife4j
knife4j:
  enable: true
  setting:
    language: zh_cn
```

