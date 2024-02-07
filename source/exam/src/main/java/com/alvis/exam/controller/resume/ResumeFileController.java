package com.alvis.exam.controller.resume;

import com.alibaba.fastjson.JSON;
import com.alvis.exam.base.RestCvResponse;
import com.alvis.exam.controller.wx.BaseWXApiController;
import com.alvis.exam.viewmodel.resume.NotificationRequestVO;
import com.alvis.exam.viewmodel.resume.ResumeFileRequestVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller("ResumeFileController")
@RequestMapping(value = "/api/codecv/resume")
//@AllArgsConstructor
@ResponseBody
@Slf4j
public class ResumeFileController  extends BaseWXApiController {


    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public RestCvResponse saveResumeFile(@RequestBody ResumeFileRequestVO requestVO) {

        log.info("saveResumeFile, requestVO:{}", JSON.toJSONString(requestVO));
        return RestCvResponse.ok();
    }


}
