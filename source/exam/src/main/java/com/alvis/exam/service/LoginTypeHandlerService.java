package com.alvis.exam.service;

import com.alvis.exam.configuration.spring.security.AuthenticationBean;

public interface LoginTypeHandlerService {
	
	public String getHandlerName();
	
	public void handle(AuthenticationBean authenticationBean);

}
