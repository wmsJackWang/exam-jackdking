package com.alvis.exam.controller.student;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alvis.exam.base.BaseApiController;
import com.alvis.exam.base.RestResponse;
import com.alvis.exam.domain.ExcalidrawFileInfo;
import com.alvis.exam.domain.JdkFolderFile;
import com.alvis.exam.domain.Subject;
import com.alvis.exam.domain.User;
import com.alvis.exam.service.JdkFolderFileService;
import com.alvis.exam.service.SubjectService;
import com.alvis.exam.viewmodel.student.education.SubjectEditRequestVM;
import com.alvis.exam.viewmodel.student.education.SubjectVM;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.reflection.Jdk;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController("StudentExcalidrawController")
@RequestMapping(value = "/api/student/excalidraw")
@AllArgsConstructor
@Slf4j
public class ExcalidrawController extends BaseApiController {

    private final JdkFolderFileService jdkFolderFileService;


    @RequestMapping(value = "/file/query", method = RequestMethod.POST)
    public RestResponse<JdkFolderFile> fileQuery(@RequestBody ExcalidrawFileInfo param) {
//        log.info("[ExcalidrawController]fileQuery, params:{}", JSON.toJSONString(param));
        User user = getCurrentUser();
        JdkFolderFile req = new JdkFolderFile();
        req.setFileName(param.getContainerName());
        req.setIsFolder(0L);
        req.setUserId(Long.valueOf(user.getId()));
        JdkFolderFile res = jdkFolderFileService.selectJdkFolderFileOne(req);
        if (Objects.isNull(res)) {
            return RestResponse.fail("文件不存在");
        }
//        log.info("[ExcalidrawController]fileQuery, resList:{}", JSON.toJSONString(res));
        return RestResponse.ok(res);
    }

    @RequestMapping(value = "/file/addOrUpdate", method = RequestMethod.POST)
    public RestResponse<SubjectEditRequestVM> addOrUpdate(@RequestBody ExcalidrawFileInfo param) {

//        log.info("[ExcalidrawController]addOrUpdate, params:{}", JSON.toJSONString(param));
//        User user = getCurrentUser();

        User user = getCurrentUser();
        JSONObject fileData = new JSONObject();
        fileData.put("containerName", param.getContainerName());
        fileData.put("elementsJson", param.getElementsJson());
        fileData.put("appStateJson", param.getAppStateJson());


        JdkFolderFile req = new JdkFolderFile();
        req.setIsFolder(0L);
        req.setFileName(param.getContainerName());
        req.setUserId(Long.valueOf(user.getId()));

        JdkFolderFile res = jdkFolderFileService.selectJdkFolderFileOne(req);

        JdkFolderFile jdkFolderFile = new JdkFolderFile();
        //数据库存在文件，则更新
        if (Objects.nonNull(res)) {
            jdkFolderFile.setId(res.getId());
        }

        jdkFolderFile.setUserId(Long.valueOf(user.getId()));
        jdkFolderFile.setFileName(param.getContainerName());
        jdkFolderFile.setFileData(fileData.toJSONString());
        jdkFolderFile.setImgData(param.getImgData());
        jdkFolderFile.setIsFolder(0L);
        jdkFolderFile.setRecordType("excalidraw");
        jdkFolderFile.setParentId(param.getParentId());
        jdkFolderFileService.saveOrUpdateJdkFolderFile(jdkFolderFile);
        return RestResponse.ok();
    }

}
