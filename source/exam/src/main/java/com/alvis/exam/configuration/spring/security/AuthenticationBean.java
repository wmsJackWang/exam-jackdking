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
    private String openid;//查取出来的openid
}
