package com.alvis.exam.service.impl;

import org.springframework.stereotype.Service;

import com.alvis.exam.configuration.spring.security.AuthenticationBean;
import com.alvis.exam.service.LoginTypeHandlerService;

@Service
public class WxAppletScanQrHandlerServiceImpl implements LoginTypeHandlerService{

	private String hanlerName ="WxAppletScanQrHandler";//微信小程序扫码登入处理器

	@Override
	public void handle(AuthenticationBean authenticationBean) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getHandlerName() {
		// TODO Auto-generated method stub
		return hanlerName;
	}

}
