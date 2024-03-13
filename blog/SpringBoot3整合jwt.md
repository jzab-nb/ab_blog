---
id: springboot3+jwt
slug: /springboot3+jwt
title: SpringBoot3整合jwt
date: 2024-03-12
tags: [框架,工具,SpringBoot,jwt]
keywords: [框架,工具,SpringBoot,jwt]
---

## 1.引入依赖

```xml
<!--        jwt工具-->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.12.3</version>
</dependency>
<!--        aop依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

## 2.书写密钥和过期时间等配置

这里使用常量类的形式

```java
public class JwtConstant {
    public static final String KEY = "JZABJDKLSJKLDJKLSAJDKLSJAKLDJKLSAJDLKJSDLKAJLKSJADLKJSAKLJDLKSJDLADJ";
    public static final Long EXP = 300L;
}
```

## 3.书写工具类

```java
/**
 * @author JZAB
 * @from http://vip.jzab.xyz
 */
public class JwtUtils {
    public static String createToken(Integer userId){
        // 指定加密算法
        SecureDigestAlgorithm<SecretKey, SecretKey> algorithm = Jwts.SIG.HS256;
        // 过期时间
        long expMillis = System.currentTimeMillis()+1000L*JwtConstant.EXP;
        Date exp = new Date(expMillis);
        // 密钥实例
        SecretKey key = Keys.hmacShaKeyFor(JwtConstant.KEY.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                // 加密算法和密钥
                .signWith(key, algorithm)
                .expiration(exp)
                .claim("userId", userId) // 自定义负载
                .compact( );
    }

    public static Integer getUserIdFromToken(String token){
        SecretKey key = Keys.hmacShaKeyFor(JwtConstant.KEY.getBytes(StandardCharsets.UTF_8));
        Integer result;
        try{
            // 解析token
            Jws<Claims> claimsJws = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);
            // 获取返回值
            result = claimsJws.getPayload().get("userId", Integer.class);
        }catch (Exception e){
            throw new BusinessException(ErrorCode.TOKEN_ERROR);
        }
        return result;
    }
}

```

## 4.定义注解和aop方法,方便校验

注解

```java
/**
 * 自定义注解实现权限校验
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AuthCheck {
    /**
     * 必须有某个角色
     */
    UserRoleEnum[] mustRole() default {UserRoleEnum.USER};
}
```

aop方法

```java
@Aspect
@Component
@Slf4j
public class AuthInterceptor {
    @Resource
    private UserService userService;

    @Around("@annotation(authCheck)")
    public Object doInterceptor(ProceedingJoinPoint joinPoint, AuthCheck authCheck) throws Throwable {
        // 获取必须的权限数组,有其中之一即可继续执行
        UserRoleEnum[] mustRole = authCheck.mustRole();
        System.out.println(Arrays.deepToString(mustRole));
        // 获取当前请求的上下文
        RequestAttributes requestAttributes = RequestContextHolder.currentRequestAttributes( );
        HttpServletRequest request = ((ServletRequestAttributes) requestAttributes).getRequest( );
        // 获取请求头中的token
        String token = request.getHeader("token");
        // token为空
        if(StringUtils.isBlank(token)){
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        // 解析token
        Integer userId = JwtUtils.getUserIdFromToken(token);
        // 获取当前登录的用户
        User userById = userService.getById(userId);
        if(userById == null){
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        // 遍历需要的权限列表,当前角色的权限满足其中之一即可
        for (UserRoleEnum userRoleEnum : mustRole) {
            // 需要的是登录或者当前用户的权限满足列表中的权限,允许继续
            if(userRoleEnum == UserRoleEnum.USER || userById.getRole().equals(userRoleEnum.getDesc())){
                return joinPoint.proceed();
            }
        }
        throw new BusinessException(ErrorCode.NO_AUTH_ERROR, "无权限");
    }
}
```

