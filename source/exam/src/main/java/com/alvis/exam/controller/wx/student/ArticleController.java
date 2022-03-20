package com.alvis.exam.controller.wx.student;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alvis.exam.base.RestResponse;
import com.alvis.exam.constants.ExamConstant;
import com.alvis.exam.controller.wx.BaseWXApiController;
import com.alvis.exam.utility.HttpUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller("WXStudentArticleController")
@RequestMapping(value = "/api/wx/student/article")
//@AllArgsConstructor
@ResponseBody
public class ArticleController  extends BaseWXApiController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    @PostMapping(value = "/list")
    public RestResponse<Map<String, Object>> articleList(Integer pageIndex, Integer pageSize) {

        String resultString = null;
        try{
            resultString = HttpUtils.sendGet(ExamConstant.blogArticleListUrl, "pageIndex="+pageIndex+"&pageSize="+pageSize);
            log.info("HttpUtils.sendGet , result:", resultString);
        }catch (Exception exception){
            log.info("HttpUtils.sendGet error, "+"pageIndex="+pageIndex+"&pageSize="+pageSize);
            RestResponse.fail();
        }

        if (StringUtils.isEmpty(resultString)) {
            RestResponse.fail("ArticleController##articleDetail  HttpUtils.sendGet result empty");
        }

        HashMap<String, Object> resultJson = JSON.parseObject(resultString, HashMap.class);
        return RestResponse.ok(resultJson);
    }


    @PostMapping(value = "/detail")
    public RestResponse<JSONObject> articleDetail(Integer articleId) {

        String resultString = null;
        try{
            resultString = HttpUtils.sendGet(ExamConstant.blogArticleDetailUrl, "cid="+articleId);
        }catch (Exception exception){
            log.info("HttpUtils.sendGet error, id:"+articleId);
            RestResponse.fail();
        }

        if (StringUtils.isEmpty(resultString)) {
            RestResponse.fail("ArticleController##articleDetail  HttpUtils.sendGet result empty");
        }

        JSONObject resultJson = JSON.parseObject(resultString);

        return RestResponse.ok(resultJson);
    }

}
