package com.alvis.exam.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.alvis.exam.configuration.application.ApplicationContextProvider;
import com.alvis.exam.configuration.spring.security.AuthenticationBean;
import com.alvis.exam.service.LoginTypeHandlerService; 

@Service
public class LoginTypeHandlerRouter implements LoginTypeHandlerService{
	
	private String hanlerName ="HandlerRouter";//各处理器的路由器
	
	private List<Map<String,LoginTypeHandlerService>> handlerList ;
	
	LoginTypeHandlerRouter(){
		
	}

	@Override
	public void handle(AuthenticationBean authenticationBean) {
		// TODO Auto-generated method stub
		
		Map<String, LoginTypeHandlerService> proxyAwares = ApplicationContextProvider.getBeanOfType(LoginTypeHandlerService.class);
		if(!StringUtils.isEmpty(authenticationBean.getLoginType())&&proxyAwares.size()>0){
			for(LoginTypeHandlerService handler:proxyAwares.values())
				if(handler.getHandlerName().equalsIgnoreCase(authenticationBean.getLoginType()))
					handler.handle(authenticationBean);
		}
		
	}

	@Override
	public String getHandlerName() {
		// TODO Auto-generated method stub
		return hanlerName;
	}

}
