package com.alvis.exam.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.alvis.exam.base.RestResponse;
import com.alvis.exam.base.SystemCode;
import com.alvis.exam.service.UserService;
import com.alvis.exam.viewmodel.common.user.UserLoginVM;

import lombok.AllArgsConstructor;

@Controller("ExamLoginController")
@RequestMapping(value = "/api/user/login")
@AllArgsConstructor
public class ExamLoginController {

    private final UserService userService;

    @RequestMapping(value = "/checkWxQrCodeLogin", method = RequestMethod.POST)
	public RestResponse checkWxQrCodeLogin(@RequestBody @Valid UserLoginVM model,HttpServletRequest request ,HttpServletResponse response) {
		
//    	if(!userService.checkLoginTokenIsExist(model.getLoginToken()))
//    		return RestResponse.fail(SystemCode.WXAPPLETQRNOTREADY.getCode(), SystemCode.WXAPPLETQRNOTREADY.getMessage());
//    	
		try {
			
	        //response的值重新塞进去
	        String result="{\"userName\":\"jack\",\"password\":\"ncl@1234\",\"remember\":false,\"loginType\":\"WxAppletScanQrHandler\"}";
	        response.setContentLength(-1);//解决可能在运行的过程中页面只输出一部分
	        response.setCharacterEncoding("UTF-8");
	        PrintWriter out=response.getWriter();
	        out.write(result);
	        out.flush();
	        out.close(); 
			request.setAttribute("key", "key");
			response.sendRedirect("/api/user/login");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			
			e.printStackTrace();
		}
    	
    	return RestResponse.ok();
	}

}
