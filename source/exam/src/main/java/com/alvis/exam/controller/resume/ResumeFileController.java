package com.alvis.exam.controller.resume;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alvis.exam.base.RestCvResponse;
import com.alvis.exam.base.SystemCode;
import com.alvis.exam.configuration.spring.security.RestUtil;
import com.alvis.exam.controller.wx.BaseWXApiController;
import com.alvis.exam.domain.ResumeTemplate;
import com.alvis.exam.domain.User;
import com.alvis.exam.domain.UserResume;
import com.alvis.exam.domain.resume.TemplateType;
import com.alvis.exam.repository.ResumeTemplateDao;
import com.alvis.exam.repository.UserResumeDao;
import com.alvis.exam.service.UserService;
import com.alvis.exam.viewmodel.resume.NotificationRequestVO;
import com.alvis.exam.viewmodel.resume.ResumeFileRequestVO;
import com.sun.javafx.geom.transform.Identity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;


@Controller("ResumeFileController")
@RequestMapping(value = "/api/codecv/resume")
//@AllArgsConstructor
@ResponseBody
@Slf4j
public class ResumeFileController  extends BaseWXApiController {

    @Autowired
    private ResumeTemplateDao resumeTemplateDao;

    @Autowired
    private UserResumeDao userResumeDao;

    @Autowired
    private UserService userService;

    static String content = "## 个人信息\n::: start\n姓名：offer收割机\n期望岗位：电气开发工程师\n手机号码：11011011011\n:::\nicon:email 12345@163.com\nicon:fillstar [个人作品集](https://coderlei.netlify.app)\nicon:github [https://github.com/acmenlei](https://github.com/acmenlei)&nbsp;\n:::\n![个人头像](https://codeleilei.gitee.io/blog/avatar.jpg)\n::: end\n\n## 教育背景\n**2019.09 - 2024.07 - 电子科技大学 -  电气工程专业 - 本科**\n主修课程：电路分析、模拟电子技术、数字电子技术、自动控制原理、电力系统分析、电磁场与电磁波、微机原理与接口技术等。\n\n## 专业技能\n- 电气工程设计与实施：熟练掌握AutoCAD、EPLAN等软件，能够独立完成电气工程项目的设计、施工和验收。\n- 电力系统分析与控制：熟悉电力系统的基本原理和工作流程，能够进行潮流分析、短路计算和稳定分析。\n- 微机控制系统设计与实现：熟练掌握PLC编程技术，能够进行控制系统的设计、调试和维护。\n- 电气设备检测与维修：熟悉常见故障及其原因，能够运用电工仪表和专用工具进行设备的检测和维修。\n- 项目管理与协调：具备良好的项目管理和协调能力，能够制定计划、分配资源、控制进度和质量。\n- 持续学习和技能提升：关注新技术和新发展，定期学习相关知识和技术，参加培训和认证，提升自己的综合素质和竞争力。\n\n## 实习经历\n**2019.09 - 2024.07 - xxx控股有限公司 - 实习生**\n- 参与电气工程项目的设计、施工和验收工作，了解工程项目的全过程。\n- 协助完成电气设备的安装、调试和维护工作，提高自己的实际操作能力。\n- 参与项目的现场管理，学会与人沟通协调，提高工作效率。\n- 学习使用 AutoCAD、EPLAN 等电气设计软件，熟悉电气图纸的绘制和修改\n\n## 项目经历\n**电力系统仿真实验 - 2022.09 - 2023.02**\n- 使用 EPLAN 软件进行电力系统的布局设计和设备选型。\n- 进行电力系统的潮流分析和短路计算，验证系统的稳定性。\n- 利用 MATLAB 进行电力系统的仿真实验，分析系统的性能和优化方案。\n- 根据仿真结果，对电力系统进行调整和优化，提高系统的效率和稳定性。\n**微机控制系统开发与实现 - 2023.09 - 2024.07**\n- 使用 PLC 编程软件进行微机控制系统的设计和编程。\n- 实现 PLC 与其他设备的通信和数据交换，实现自动化控制功能。\n- 利用 LabVIEW 进行微机控制系统的软件编程和硬件驱动开发。\n- 调试和优化微机控制系统，确保其稳定运行和满足生产需求\n\n## 竞赛荣誉\n- 2019 - 2022 电子科技大学优秀学生奖学金\n- 2019 - 2022 电子科技大学三好学生称号\n\n## 自我评价\n- 具备扎实的电气工程专业知识，能够熟练运用所学知识解决实际问题。\n- 具备良好的学习能力和适应能力，能够快速掌握新知识和技能。\n- 具备较强的团队协作能力和沟通能力，能够与团队成员共同完成任务。\n- 具备一定的创新能力和解决问题的能力，能够针对实际问题提出合理的解决方案。";

    @RequestMapping(value = "/resumeFileList", method = RequestMethod.POST)
    public RestCvResponse queryResumeFile(@RequestBody ResumeFileRequestVO requestVO) {

        User user = userService.getCodeCvUserInfoByToken(requestVO.getToken());
        if (user == null) {
            return RestCvResponse.fail(SystemCode.AccessTokenError.getCode(), SystemCode.AccessTokenError.getMessage());
        }
        UserResume req = new UserResume();
        req.setUserId(Long.valueOf(user.getId()));
        List<UserResume> queryResultList = userResumeDao.selectUserResumeList(req);

        return RestCvResponse.ok(queryResultList);
    }


    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public RestCvResponse saveResumeFile(@RequestBody ResumeFileRequestVO requestVO) {

        log.info("saveResumeFile, requestVO:{}", JSON.toJSONString(requestVO));

        ResumeTemplate req = new ResumeTemplate();
        req.setType(requestVO.getType());
        List<ResumeTemplate> queryResultList = resumeTemplateDao.selectResumeTemplateList(req);
        ResumeTemplate data = queryResultList.get(0);

        UserResume userResume = new UserResume();
        userResume.setName(requestVO.getTitle());
        userResume.setUserId(requestVO.getUserId());
        userResume.setFont(data.getFont());
        userResume.setContent(requestVO.getFileContent());
        userResume.setLineheight(data.getLineheight());
        userResume.setImg(data.getImg());
        userResume.setPrimaryBackground(data.getPrimaryBackground());
        userResume.setPrimaryColor(data.getPrimaryColor());
        userResume.setType(data.getType());

        userResumeDao.insertUserResume(userResume);

        return RestCvResponse.ok();
    }

    @RequestMapping(value = "/saveTemplate", method = RequestMethod.POST)
    public RestCvResponse saveTemplate(@RequestBody ResumeFileRequestVO requestVO) {

        log.info("saveResumeFile, requestVO:{}", JSON.toJSONString(requestVO));
        ResumeTemplate resumeTemplate = new ResumeTemplate();
        BeanUtils.copyProperties(requestVO.getTemplate(), resumeTemplate);
        resumeTemplateDao.insertResumeTemplate(resumeTemplate);
        return RestCvResponse.ok();
    }

    @RequestMapping(value = "/get/templateData", method = RequestMethod.POST)
    public RestCvResponse getResumeTemplate(@RequestBody ResumeFileRequestVO requestVO) {
        log.info("getResumeTemplate, requestVO:{}", JSON.toJSONString(requestVO));

        return RestCvResponse.ok();
    }

    @RequestMapping(value = "/get/allTemplateData", method = RequestMethod.POST)
    public RestCvResponse getAllTemplateData(@RequestBody ResumeFileRequestVO requestVO) {
        log.info("getResumeTemplate, requestVO:{}", JSON.toJSONString(requestVO));

        List<ResumeTemplate> queryResultList = resumeTemplateDao.selectResumeTemplateList(null);


        Map<String, ResumeTemplate> mapData = queryResultList.stream()
                        .collect(Collectors.toMap(ResumeTemplate::getPath, Function.identity()));

        Set<List<Object>> resultSet = mapData.entrySet().stream()
                        .map(stringTemplateTypeEntry -> {

                            List<Object> entry = new ArrayList<>();

                            JSONObject json = new JSONObject();
                            json.put("default", stringTemplateTypeEntry.getValue());
                            entry.add(stringTemplateTypeEntry.getKey());
                            entry.add(json);
                            return entry;
                        }).collect(Collectors.toSet());

        return RestCvResponse.ok(JSON.toJSONString(resultSet));
    }

}
