package com.alvis.exam.controller.student;

import java.util.*;

import com.alvis.exam.base.BaseApiController;
import com.alvis.exam.base.RestResponse;
import com.alvis.exam.domain.JdkTask;
import com.alvis.exam.service.JdkTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

/**
 * 任务Controller
 * 
 * @author jackdking
 * @date 2024-10-20
 */
@Controller
@RequestMapping(value = "/api/student/task")
public class JdkTaskController  extends BaseApiController
{
    @Autowired
    private JdkTaskRepository jdkTaskRepository;


    @PostMapping("/list")
    @ResponseBody
    public RestResponse list()
    {
        long userid = Long.parseLong(getCurrentUser().getId().toString());

        JdkTask req  = new JdkTask();
        req.setUserId(userid);
        List<JdkTask> list = jdkTaskRepository.selectJdkTaskList(req);
        HashMap<String, List<String>> retList = new HashMap<>();
        List<String> readyBegin = new ArrayList<>();
        List<String> search = new ArrayList<>();
        List<String> doing = new ArrayList<>();
        List<String> checking = new ArrayList<>();
        List<String> finish = new ArrayList<>();

        retList.put("readyBegin", readyBegin);
        retList.put("search", search);
        retList.put("doing", doing);
        retList.put("checking", checking);
        retList.put("finish", finish);

        Optional.ofNullable(list).orElseGet(Collections::emptyList)
                .stream()
                .forEach(jdkTask -> {
                    if (jdkTask.getTaskStatus() == 10001) {
                        readyBegin.add(jdkTask.getContent());
                    }

                    if (jdkTask.getTaskStatus() == 10003) {
                        search.add(jdkTask.getContent());
                    }

                    if (jdkTask.getTaskStatus() == 10005) {
                        doing.add(jdkTask.getContent());
                    }

                    if (jdkTask.getTaskStatus() == 10007) {
                        checking.add(jdkTask.getContent());
                    }

                    if (jdkTask.getTaskStatus() == 10009) {
                        finish.add(jdkTask.getContent());
                    }
                });


        return RestResponse.ok(retList);
    }

    /**
     * 新增保存任务
     */
    @PostMapping("/add")
    @ResponseBody
    public RestResponse addSave(@RequestBody JdkTask jdkTask)
    {
        long userid = Optional.ofNullable(jdkTask.getUserId()).orElseGet(() -> Long.parseLong(getCurrentUser().getId().toString()));

        jdkTask.setUserId(userid);
        return RestResponse.ok(jdkTaskRepository.saveOrUpdateJdkTask(jdkTask));
    }

    /**
     * 修改保存任务
     */
    @PostMapping("/edit")
    @ResponseBody
    public Object editSave(@RequestBody JdkTask jdkTask)
    {
        long userid = Optional.ofNullable(jdkTask.getUserId()).orElseGet(() -> Long.parseLong(getCurrentUser().getId().toString()));

        jdkTask.setUserId(userid);
        return RestResponse.ok(jdkTaskRepository.saveOrUpdateJdkTask(jdkTask));
    }

    /**
     * 删除任务
     */
    @PostMapping( "/remove")
    @ResponseBody
    public Object remove(String ids)
    {
        return RestResponse.ok(jdkTaskRepository.deleteJdkTaskByIds(ids));
    }
}
