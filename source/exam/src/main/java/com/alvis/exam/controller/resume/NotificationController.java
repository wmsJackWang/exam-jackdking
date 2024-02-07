package com.alvis.exam.controller.resume;

import com.alvis.exam.base.RestCvResponse;
import com.alvis.exam.controller.wx.BaseWXApiController;
import com.alvis.exam.viewmodel.resume.NotificationRequestVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller("NotificationController")
@RequestMapping(value = "/api/codecv/notification")
//@AllArgsConstructor
@ResponseBody
public class NotificationController  extends BaseWXApiController {


    private static final Logger log = LoggerFactory.getLogger(AuthController.class);


    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public RestCvResponse queryNotification(NotificationRequestVO requestVO) {


        return RestCvResponse.ok();
    }

}
