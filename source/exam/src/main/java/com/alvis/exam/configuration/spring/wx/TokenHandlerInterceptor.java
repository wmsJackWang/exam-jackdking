package com.alvis.exam.configuration.spring.wx;

import com.alvis.exam.base.SystemCode;
import com.alvis.exam.configuration.spring.security.RestUtil;
import com.alvis.exam.context.WxContext;
import com.alvis.exam.domain.User;
import com.alvis.exam.domain.UserToken;
import com.alvis.exam.service.UserService;
import com.alvis.exam.service.UserTokenService;
import com.alvis.exam.service.impl.UserTokenServiceImpl;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

@Component
public class TokenHandlerInterceptor implements HandlerInterceptor {
	

	private static final Logger log = LoggerFactory.getLogger(TokenHandlerInterceptor.class);

    private final UserTokenService userTokenService;
    private final UserService userService;
    private final WxContext wxContext;

    @Autowired
    public TokenHandlerInterceptor(UserTokenService userTokenService, UserService userService, WxContext wxContext) {
        this.userTokenService = userTokenService;
        this.userService = userService;
        this.wxContext = wxContext;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("token");
        if (StringUtils.isEmpty(token)) {
            RestUtil.response(response, SystemCode.UNAUTHORIZED);
            return false;
        }

        if (StringUtils.isBlank(token)) {
            RestUtil.response(response, SystemCode.UNAUTHORIZED);
            return false;
        }

        if (token.length() != 36) {
            RestUtil.response(response, SystemCode.UNAUTHORIZED);
            return false;
        }

        UserToken userToken = userTokenService.getToken(token);
        if (null == userToken) {
            RestUtil.response(response, SystemCode.UNAUTHORIZED);
            return false;
        }

        Date now = new Date();
        User user = userService.getUserByUserName(userToken.getUserName());
        if (now.before(userToken.getEndTime())) {
            wxContext.setContext(user,userToken);
            return true;
        } else {   //refresh token
            UserToken refreshToken = userTokenService.refreshUserToken(user);

			log.info("用户信息：{}",user.toString());
            log.info("now:{} , endtime:{}",now.getTime(),userToken.getEndTime().getTime());
			log.info("刷新token值,token:{}",refreshToken.toString());
            RestUtil.response(response, SystemCode.AccessTokenError.getCode(), SystemCode.AccessTokenError.getMessage(), refreshToken.getToken());
            return false;
        }
    }
}
