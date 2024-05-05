package com.alvis.exam.controller.resume;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alvis.exam.base.RestCvResponse;
import com.alvis.exam.base.RestResponse;
import com.alvis.exam.base.SystemCode;
import com.alvis.exam.configuration.property.SystemConfig;
import com.alvis.exam.configuration.spring.security.RestUtil;
import com.alvis.exam.controller.wx.BaseWXApiController;
import com.alvis.exam.domain.User;
import com.alvis.exam.domain.UserToken;
import com.alvis.exam.domain.enums.UserStatusEnum;
import com.alvis.exam.service.AuthenticationService;
import com.alvis.exam.service.UserService;
import com.alvis.exam.service.UserTokenService;
import com.alvis.exam.utility.WxUtil;
import com.alvis.exam.viewmodel.resume.UserRequestVO;
import com.alvis.exam.viewmodel.wx.student.user.BindInfo;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.UUID;


@Controller("ResumeAuthController")
@RequestMapping(value = "/api/codecv/user")
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

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public RestCvResponse login(HttpServletRequest request, @RequestBody UserRequestVO userRequestVO) {
        String token = request.getHeader("x-access-token");//拿到session token数据
        log.info("login, token:{}, userRequestVO:{}", token, JSON.toJSONString(userRequestVO));

        if (StringUtils.isEmpty(userRequestVO.getUsername()) || StringUtils.isEmpty(userRequestVO.getPassword())) {
            return RestCvResponse.fail(SystemCode.AuthError.getCode(), SystemCode.AuthError.getMessage());
        }

        User user = userService.getUserByUserName(userRequestVO.getUsername());
        if (user == null) {
            return RestCvResponse.fail(SystemCode.AuthError.getCode(), SystemCode.AuthError.getMessage());
        }

        if (!StringUtils.equalsIgnoreCase(authenticationService.pwdDecode(user.getPassword()), userRequestVO.getPassword())) {
            return RestCvResponse.fail(SystemCode.AuthError.getCode(), SystemCode.AuthError.getMessage());
        }
        token = UUID.randomUUID().toString();
        log.info("新建token值,token:{}", token);
        userService.pushTokenCodeCvUserInfo2Cache(token, JSON.toJSONString(user));// 推送到cache

        JSONObject userJson = parseUserInfo(user);
        return RestCvResponse.ok(userJson, token);
    }

    private JSONObject parseUserInfo(User user) {

        JSONObject userJson = new JSONObject();
        userJson.put("uid", user.getId());
        userJson.put("nickName", user.getRealName());
        userJson.put("username", user.getUserName());
        userJson.put("sex", genderConvert(user.getSex()));
        userJson.put("professional", "Java后端");
        userJson.put("graduation", "2015");
        userJson.put("school", "NUAA");
        userJson.put("avatar", "https://apic.douyucdn.cn/upload/avatar_v3/202004/eb347e4e49a5426496be1376cce6e203_big.jpg");
        userJson.put("origin", "北京");
        return userJson;
    }

    private String genderConvert(Integer sex) {
        if (sex == null) {
            return "男";
        }
        return sex == 1 ? "男":"女";
    }


    /*
     * 检测用户是否已经登录
     */
    @RequestMapping(value = "/verify", method = RequestMethod.POST)
    public RestCvResponse verify(HttpServletRequest request, @RequestBody UserRequestVO userRequestVO) {

        String token = userRequestVO.getToken();//拿到session token数据
        log.info("verify, token:{}, userRequestVO:{}", token, JSON.toJSONString(userRequestVO));
        User user = userService.getCodeCvUserInfoByToken(token);
        if (user == null) {
            return RestCvResponse.fail(SystemCode.AccessTokenError.getCode(), SystemCode.AccessTokenError.getMessage());
        }

        log.info("verify, token:{}, user:{}", token, JSON.toJSONString(user));
        JSONObject userJson = parseUserInfo(user);
        return RestCvResponse.ok(userJson, token);
    }
    
    @RequestMapping(value = "/scanQrCode/{token}/{code}", method = RequestMethod.POST)
    public RestResponse scanQrCode(@Valid @NotBlank @PathVariable("code") String  code , @Valid @NotBlank @PathVariable("token") String token) {
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
	        	 
//	        	System.out.println("scanQrCode 接口推送openid信息到缓存成功：" + openid);
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
