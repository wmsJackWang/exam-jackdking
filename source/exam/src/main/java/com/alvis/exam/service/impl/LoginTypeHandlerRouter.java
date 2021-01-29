package com.alvis.exam.service.impl;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.alvis.exam.configuration.application.ApplicationContextProvider;
import com.alvis.exam.configuration.spring.security.AuthenticationBean;
import com.alvis.exam.service.LoginTypeHandlerService; 

@Service("LoginTypeHandlerRouter")
public class LoginTypeHandlerRouter implements LoginTypeHandlerService{

	private static final Logger log = LoggerFactory.getLogger(LoginTypeHandlerRouter.class);
	
	private String hanlerName ="HandlerRouter";//各处理器的路由器
	
	private List<Map<String,LoginTypeHandlerService>> handlerList ;
	
	private static  LoginTypeHandlerService loginTypeHandlerRouter;
	
	private LoginTypeHandlerRouter(){
		
	}
	
	//单例模式
	public static  LoginTypeHandlerService getRouter() {
		
		if(loginTypeHandlerRouter==null)
			synchronized (LoginTypeHandlerRouter.class) {
				if(loginTypeHandlerRouter==null)
					loginTypeHandlerRouter = ApplicationContextProvider.getBean("LoginTypeHandlerRouter");
			}
		return loginTypeHandlerRouter;
	}
	

	@Override
	public void handle(AuthenticationBean authenticationBean) throws Exception {
		// TODO Auto-generated method stub
		log.info("进入HandlerRouter路由器authenticationBean：{}"+authenticationBean.toString());
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
