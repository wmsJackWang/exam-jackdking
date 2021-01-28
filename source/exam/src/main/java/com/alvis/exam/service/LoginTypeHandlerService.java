package com.alvis.exam.service;

import com.alvis.exam.configuration.spring.security.AuthenticationBean;

public interface LoginTypeHandlerService {
	
	public void handle(AuthenticationBean authenticationBean);

}
