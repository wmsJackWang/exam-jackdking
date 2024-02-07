package com.alvis.exam.configuration.spring.codecv;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alvis.exam.base.SystemCode;
import com.alvis.exam.configuration.property.SystemConfig;
import com.alvis.exam.configuration.spring.security.RestUtil;
import com.alvis.exam.context.WxContext;
import com.alvis.exam.domain.User;
import com.alvis.exam.domain.UserToken;
import com.alvis.exam.service.UserService;
import com.alvis.exam.service.UserTokenService;
import com.alvis.exam.service.impl.AuthenticationServiceImpl;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.UUID;

@Component
public class CodeCVTokenHandlerInterceptor implements HandlerInterceptor {


	private static final Logger log = LoggerFactory.getLogger(CodeCVTokenHandlerInterceptor.class);

    private final UserTokenService userTokenService;
    private final UserService userService;
    private final WxContext wxContext;

    @Autowired
    private RedisTemplate redisTemplate;

    @Autowired
    private AuthenticationServiceImpl authenticationService;

    @Autowired
    public CodeCVTokenHandlerInterceptor(UserTokenService userTokenService, UserService userService, WxContext wxContext) {
        this.userTokenService = userTokenService;
        this.userService = userService;
        this.wxContext = wxContext;
    }

    @Autowired
    private SystemConfig systemConfig;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("x-access-token");//拿到session token数据
        User userParam = getUserInfo(request);
        String username = userParam.getUserName();
        String password = userParam.getPassword();
        log.info("resume tokenInterceptor, token:{}, username:{}, password", token, username, password);
        User user = userService.getCodeCvUserInfoByToken(token);
        if (user == null && (StringUtils.isEmpty(username) || StringUtils.isEmpty(password))) {
            RestUtil.response(response, SystemCode.AccessTokenError);
            return false;
        }
        if (user == null) {//缓存token不存在或失效
            user = userService.getUserByUserName(username);
            if (user == null) {
                RestUtil.response(response, SystemCode.AuthError);
                return false;
            }

            if (!StringUtils.equalsIgnoreCase(authenticationService.pwdDecode(user.getPassword()), password)) {
                RestUtil.response(response, SystemCode.AuthError);
                return false;
            }
            token = UUID.randomUUID().toString();
            log.info("刷新token值,token:{}", token);
            userService.pushTokenCodeCvUserInfo2Cache(token, JSON.toJSONString(user));// 推送到cache
        }
//
//        JSONObject resData = new JSONObject();
//        JSONObject userJson = new JSONObject();
//        userJson.put("uid", user.getId());
//        userJson.put("nickName", user.getRealName());
//        userJson.put("username", user.getUserName());
//        userJson.put("sex", genderConvert(user.getSex()));
//        userJson.put("professional", "Java后端");
//        userJson.put("graduation", "2015");
//        userJson.put("school", "NUAA");
//        userJson.put("avatar", "https://apic.douyucdn.cn/upload/avatar_v3/202004/eb347e4e49a5426496be1376cce6e203_big.jpg");
//        userJson.put("origin", "北京");
//        RestUtil.data(response, SystemCode.SUCCESS.getCode(), SystemCode.SUCCESS.getMessage(), userJson, token);

        log.info("token:{}, 用户信息：{}", token, JSON.toJSONString(user));
        return true;
    }

    private String genderConvert(Integer sex) {
       return sex == 1 ? "男":"女";
    }

    private User getUserInfo(HttpServletRequest request) {

        try {
            StringBuilder buffer = new StringBuilder();
            BufferedReader reader = request.getReader();
            String line;
            while((line = reader.readLine()) != null) {
                buffer.append(line);
            }
            User user = JSON.parseObject(buffer.toString(), User.class);
            return user;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
