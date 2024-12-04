---
id: MybatisPlus多数据源配置
slug: /MybatisPlus多数据源配置
title: MybatisPlus多数据源配置
date: 2024-12-04
tags: [后端]
keywords: [后端]
---

## 项目背景

在实际开发中,可能会遇到一个项目连接多个数据库的情况,这时候就需要进行多数据源的配置

## 引入依赖

```XML
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>dynamic-datasource-spring-boot-starter</artifactId>
    <version>3.5.1</version>
</dependency>
```

## yml文件配置数据源

在application.yml文件中配置多套数据源连接

```YAML
spring:
  datasource:
    dynamic:
      primary: ds1
      strict: false
      datasource:
        ds1:
          url: jdbc:mysql://${project.db1.host}:${project.db1.port}/${project.db1.database}?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai
          driver-class-name: com.mysql.cj.jdbc.Driver
          username: ${project.db1.un}
          password: ${project.db1.pw}
        ds2:
          url: jdbc:oracle:thin:@${project.db2.host}:${project.db2.port}:${project.db2.database}
          driver-class-name: oracle.jdbc.OracleDriver
          username: ${project.db2.un}
          password: ${project.db2.pw}
```

在不同环境对应的文件中(如application-dev)配置用户名密码等差异化信息

```YAML
project:
  db1:
    database: init
    pw: xxxxxx
    un: root
    port: 3306
    host: 127.0.0.1
  db2:
    database: ORCL
    pw: xxxxxx
    un: oes601
    port: 1521
    host: 127.0.0.1
```

## 使用配置的数据源

在Mapper层和Service层的类上添加注解

```Java
@DS("数据源名称")
```