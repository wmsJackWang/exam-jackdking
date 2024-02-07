package com.alvis.exam.configuration.spring.security;

import lombok.Data;

/**
 * @author alvis
 */

@Data
public class AuthenticationBean {
    private String userName;
    private String password;
    private boolean remember;
    private String loginType;//登入类型，默认类型是用户名+密码方式，默认值为空，扩展方式是小程序扫码登入。
    private String loginToken;//查取出来的loginToken，再根据token的值去获取openid的值，然后通过openid查出用户信息。
    private String redirect;//重定向url
}
