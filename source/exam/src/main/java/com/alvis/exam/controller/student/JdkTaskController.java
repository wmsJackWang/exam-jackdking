package com.alvis.exam.controller.student;

import java.util.*;
import java.util.stream.Collectors;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alvis.exam.base.BaseApiController;
import com.alvis.exam.base.RestResponse;
import com.alvis.exam.domain.JdkTask;
import com.alvis.exam.domain.TaskChangeReq;
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
        HashMap<String, List<JdkTask>> retList = new HashMap<>();
        List<JdkTask> readyBegin = new ArrayList<>();
        List<JdkTask> search = new ArrayList<>();
        List<JdkTask> doing = new ArrayList<>();
        List<JdkTask> checking = new ArrayList<>();
        List<JdkTask> finish = new ArrayList<>();

        retList.put("readyBegin", readyBegin);
        retList.put("search", search);
        retList.put("doing", doing);
        retList.put("checking", checking);
        retList.put("finish", finish);

        Optional.ofNullable(list).orElseGet(Collections::emptyList)
                .stream()
                .forEach(jdkTask -> {
                    if (jdkTask.getTaskStatus() == 10001) {
                        readyBegin.add(jdkTask);
                    }

                    if (jdkTask.getTaskStatus() == 10003) {
                        search.add(jdkTask);
                    }

                    if (jdkTask.getTaskStatus() == 10005) {
                        doing.add(jdkTask);
                    }

                    if (jdkTask.getTaskStatus() == 10007) {
                        checking.add(jdkTask);
                    }

                    if (jdkTask.getTaskStatus() == 10009) {
                        finish.add(jdkTask);
                    }
                });


        return RestResponse.ok(retList);
    }

    /**
     * 新增保存任务
     */
    @PostMapping("/changeStatus")
    @ResponseBody
    public RestResponse changeStatus(@RequestBody TaskChangeReq taskChangeReq)
    {
        long userid = Optional.ofNullable(taskChangeReq.getUserId()).orElseGet(() -> Long.parseLong(getCurrentUser().getId().toString()));
        taskChangeReq.setUserId(userid);

        Map<Integer, Integer> statusMap = new HashMap<>();
        statusMap.put(0, 10001);
        statusMap.put(1, 10003);
        statusMap.put(2, 10005);
        statusMap.put(3, 10007);
        statusMap.put(4, 10009);

        List<JSONObject> dataList = JSON.parseArray(taskChangeReq.getData(), JSONObject.class);
        List<JSONArray> finalList = Optional.ofNullable(dataList).orElseGet(Collections::emptyList)
                .stream()
                .map(data -> data.getJSONArray("list"))
                .collect(Collectors.toList());
        for (int index = 0 ; index < finalList.size() ; index ++) {
            boolean isExist = Optional.ofNullable(finalList.get(index)).orElseGet(JSONArray::new)
                    .stream()
                    .anyMatch(obj -> {
                        JSONObject json = JSON.parseObject(JSON.toJSONString(obj));
                        if ((long) json.getLong("id") == taskChangeReq.getId()) {
                            return true;
                        }
                        return false;
                    });
            if (!isExist) {
                continue;
            }
            Integer status = statusMap.get(index);
            JdkTask task = new JdkTask();
            task.setTaskStatus(status);
            task.setId(taskChangeReq.getId());
            task.setUserId(taskChangeReq.getUserId());
            jdkTaskRepository.saveOrUpdateJdkTask(task);

        }

        return RestResponse.ok();
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
