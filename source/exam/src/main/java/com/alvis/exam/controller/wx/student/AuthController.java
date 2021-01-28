package com.alvis.exam.controller.wx.student;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alvis.exam.base.RestResponse;
import com.alvis.exam.configuration.property.SystemConfig;
import com.alvis.exam.controller.wx.BaseWXApiController;
import com.alvis.exam.domain.UserToken;
import com.alvis.exam.domain.enums.UserStatusEnum;
import com.alvis.exam.service.AuthenticationService;
import com.alvis.exam.service.UserService;
import com.alvis.exam.service.UserTokenService;
import com.alvis.exam.utility.WxUtil;
import com.alvis.exam.viewmodel.wx.student.user.BindInfo;


@Controller("WXStudentAuthController")
@RequestMapping(value = "/api/wx/student/auth")
//@AllArgsConstructor
@ResponseBody
public class AuthController extends BaseWXApiController {
	
	
	private static final Logger log = LoggerFactory.getLogger(AuthController.class);


	@Autowired
    private  SystemConfig systemConfig;
	@Autowired
    private  AuthenticationService authenticationService;
	@Autowired
    private  UserService userService;
	@Autowired
    private  UserTokenService userTokenService;

    @RequestMapping(value = "/bind", method = RequestMethod.POST)
    public RestResponse bind(@Valid BindInfo model) {
        com.alvis.exam.domain.User user = userService.getUserByUserName(model.getUserName());
        if (user == null) {
            return RestResponse.fail(2, "用户名或密码错误");
        }
        boolean result = authenticationService.authUser(user, model.getUserName(), model.getPassword());
        if (!result) {
            return RestResponse.fail(2, "用户名或密码错误");
        }
        UserStatusEnum userStatusEnum = UserStatusEnum.fromCode(user.getStatus());
        if (UserStatusEnum.Disable == userStatusEnum) {
            return RestResponse.fail(3, "用户被禁用");
        }
        String code = model.getCode();
        String openid = WxUtil.getOpenId(systemConfig.getWx().getAppid(), systemConfig.getWx().getSecret(), code);
        if (null == openid) {
            return RestResponse.fail(4, "获取微信OpenId失败");
        }
        user.setWxOpenId(openid);
        UserToken userToken = userTokenService.bind(user);
        return RestResponse.ok(userToken.getToken());
    }


    /*
     * 使用code获取得到openid，然后查看是否有用户信息数据
     * 这个方法只是验证用户信息是否绑定username和password。
     * 
     * 这个方法的进化版本改为 checkBindV2: 用户默认登入，如果没有用户数据就自动登入
     * 
     */
    @RequestMapping(value = "/checkBind", method = RequestMethod.POST)
    public RestResponse checkBind(@Valid @NotBlank String code) {
        String openid = WxUtil.getOpenId(systemConfig.getWx().getAppid(), systemConfig.getWx().getSecret(), code);
        if (null == openid) {
            return RestResponse.fail(3, "获取微信OpenId失败");
        }
        UserToken userToken = userTokenService.checkBind(openid);
        if (null != userToken) {
            return RestResponse.ok(userToken.getToken());
        }
        return RestResponse.fail(2, "用户未绑定");
    }
    
    @RequestMapping(value = "/scanQrCode", method = RequestMethod.POST)
    public RestResponse scanQrCode(@Valid @NotBlank String  code , @Valid @NotBlank String token) {
    	log.info("進入到了scanQrCode接口，参数有code:{},token:{}",code,token);
        String openid = WxUtil.getOpenId(systemConfig.getWx().getAppid(), systemConfig.getWx().getSecret(), code);
        if (null == openid) {
            return RestResponse.fail(3, "获取微信OpenId失败");
        }
        boolean result = false;
		try { 
			result = userService.pushTokenOpenid2Cache(token, openid);
	        
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
	        
		}finally {
			if (result) {
	        	 
	        	System.out.println("scanQrCode 接口推送openid信息到缓存成功：" + openid);
	        	log.info("scanQrCode接口推送openid信息到缓存成功，openid:{}",openid);
	        	
	            return RestResponse.ok("扫码登入成功");
	        }
			return RestResponse.fail(2, "系统繁忙，请稍后再试");
		}
    }    
    
    
    /*
     * checkBindV2 接口，无论用户是否绑定，是否在pc端注册，都会使用这个方式去登入
     */
    @RequestMapping(value = "/checkBindV2", method = RequestMethod.POST)
    public RestResponse checkBindV2(@Valid @NotBlank String  code) {
    	log.info("進入到了checkBindV2接口，参数有code:{}",code);
        String openid = WxUtil.getOpenId(systemConfig.getWx().getAppid(), systemConfig.getWx().getSecret(), code);
        if (null == openid) {
            return RestResponse.fail(3, "获取微信OpenId失败");
        }
        UserToken userToken = null;
		try {
			userToken = userTokenService.existOrCreate(openid);
	        
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
	        
		}finally {
			if (null != userToken) {
	        	 
	        	System.out.println("checkBindV2  用戶token信息："+userToken.getToken());
	        	
	            return RestResponse.ok(userToken.getToken());
	        }
			return RestResponse.fail(2, "系统繁忙，请稍后再试");
		}
    }


    @RequestMapping(value = "/unBind", method = RequestMethod.POST)
    public RestResponse unBind() {
        UserToken userToken = getUserToken();
        userTokenService.unBind(userToken);
        return RestResponse.ok();
    }
}
