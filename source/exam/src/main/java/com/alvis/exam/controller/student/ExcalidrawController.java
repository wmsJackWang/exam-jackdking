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
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
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
        log.info("[ExcalidrawController]fileQuery, params:{}", JSON.toJSONString(param));
        JdkFolderFile req = new JdkFolderFile();
        req.setFileName(param.getContainerName());
        req.setIsFolder(0L);
        List<JdkFolderFile> resList = jdkFolderFileService.selectJdkFolderFileList(req);
        if (CollectionUtils.isEmpty(resList)) {
            return RestResponse.fail("文件不存在");
        }
        log.info("[ExcalidrawController]fileQuery, resList:{}", JSON.toJSONString(resList));
        return RestResponse.ok(resList.get(0));
    }

    @RequestMapping(value = "/file/addOrUpdate", method = RequestMethod.POST)
    public RestResponse<SubjectEditRequestVM> addOrUpdate(@RequestBody ExcalidrawFileInfo param) {

        log.info("[ExcalidrawController]addOrUpdate, params:{}", JSON.toJSONString(param));
//        User user = getCurrentUser();

        JSONObject fileData = new JSONObject();
        fileData.put("containerName", param.getContainerName());
        fileData.put("elementsJson", param.getElementsJson());
        fileData.put("appStateJson", param.getAppStateJson());


        JdkFolderFile req = new JdkFolderFile();
        req.setIsFolder(0L);
        req.setFileName(param.getContainerName());
        List<JdkFolderFile> queryList = jdkFolderFileService.selectJdkFolderFileList(req);

        JdkFolderFile jdkFolderFile = new JdkFolderFile();
        //数据库存在文件，则更新
        if (!CollectionUtils.isEmpty(queryList)) {
            jdkFolderFile.setId(queryList.get(0).getId());
        }

        jdkFolderFile.setFileName(param.getContainerName());
        jdkFolderFile.setFileData(fileData.toJSONString());
        jdkFolderFile.setIsFolder(0L);
        jdkFolderFile.setRecordType("excalidraw");
        jdkFolderFile.setParentId(5L);
        jdkFolderFileService.saveOrUpdateJdkFolderFile(jdkFolderFile);
        return RestResponse.ok();
    }

}
