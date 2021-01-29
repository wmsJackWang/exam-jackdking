package com.alvis.exam.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.alvis.exam.configuration.spring.security.AuthenticationBean;
import com.alvis.exam.domain.User;
import com.alvis.exam.service.LoginTypeHandlerService;
import com.alvis.exam.service.UserService;

@Service
public class WxAppletScanQrHandlerServiceImpl implements LoginTypeHandlerService{

	private String hanlerName ="WxAppletScanQrHandler";//微信小程序扫码登入处理器
	

    private final RedisTemplate<String, Object> redisTemplate;
    private final UserService userService;

    @Autowired
	public WxAppletScanQrHandlerServiceImpl(RedisTemplate<String, Object> redisTemplate, UserService userService) {

        this.redisTemplate = redisTemplate;
        this.userService = userService;
    	
	}

	@Override
	public void handle(AuthenticationBean authenticationBean) throws Exception {
		// TODO Auto-generated method stub
		String openid = userService.getOpenidByLoginTokenFromCache(authenticationBean.getLoginToken());
		User user = null;
		if(StringUtils.isEmpty(openid))
			user = userService.selectByWxOpenId(openid);
		else
			throw new Exception("还未使用小程序扫码") ;
		
		authenticationBean.setUserName(user.getUserName());
		authenticationBean.setPassword(user.getPassword());
	}

	@Override
	public String getHandlerName() {
		// TODO Auto-generated method stub
		return hanlerName;
	}

}
