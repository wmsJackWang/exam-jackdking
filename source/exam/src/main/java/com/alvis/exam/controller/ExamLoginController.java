package com.alvis.exam.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alvis.exam.base.RestResponse;
import com.alvis.exam.base.SystemCode;
import com.alvis.exam.service.UserService;
import com.alvis.exam.viewmodel.common.user.UserLoginVM;

import lombok.AllArgsConstructor;

@Controller("ExamLoginController")
@RequestMapping(value = "/api/user/login")
@AllArgsConstructor
public class ExamLoginController {
	

	private static final Logger log = LoggerFactory.getLogger(ExamLoginController.class);

    private final UserService userService;
    
    Map<String, String> parameter = new HashMap<String, String>();

    @ResponseBody
    @RequestMapping(value = "/checkWxQrCodeLogin", method = RequestMethod.POST)
	public RestResponse checkWxQrCodeLogin(@RequestBody @Valid UserLoginVM model,HttpServletRequest request ,HttpServletResponse response) {
		
    	//如果token不存在，则表示 用户还未扫码
    	boolean result = false;
    	result = userService.checkLoginTokenIsExist(model.getLoginToken());
    	log.info("微信小程序扫码登入，验证token是否存在：{}",result);
    	//如果token的key不存在，则返回WXAPPLETQRNOTREADY(503,"用户还未使用微信小程序扫码");
    	if(!result)
    		return RestResponse.fail(SystemCode.WXAPPLETQRNOTREADY.getCode(), SystemCode.WXAPPLETQRNOTREADY.getMessage());
//    	
    	
    	return RestResponse.ok();
	}
}
