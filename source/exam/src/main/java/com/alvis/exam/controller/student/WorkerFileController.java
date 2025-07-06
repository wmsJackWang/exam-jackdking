package com.alvis.exam.controller.student;


import com.alibaba.fastjson.JSON;
import com.alvis.exam.base.BaseApiController;
import com.alvis.exam.base.RestResponse;
import com.alvis.exam.domain.JdkFolderFile;
import com.alvis.exam.domain.User;
import com.alvis.exam.domain.WorkbenchFileInfo;
import com.alvis.exam.service.JdkFolderFileService;
import com.alvis.exam.viewmodel.student.education.SubjectEditRequestVM;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController("WorkerFileController")
@RequestMapping(value = "/api/student/workfile")
@AllArgsConstructor
@Slf4j
public class WorkerFileController extends BaseApiController {

    private final JdkFolderFileService jdkFolderFileService;

    @RequestMapping(value = "/query/processOn", method = RequestMethod.POST)
    public RestResponse<JdkFolderFile> fileQuery(@RequestBody WorkbenchFileInfo param) {
//        log.info("[WorkerFileController]fileQuery, params:{}", JSON.toJSONString(param));
        User user = getCurrentUser();
        JdkFolderFile req = new JdkFolderFile();
        req.setFileName(param.getFileName());
        req.setIsFolder(0L);
        req.setUserId(Long.valueOf(user.getId()));
        List<JdkFolderFile> resList = jdkFolderFileService.selectJdkFolderFileList(req);
        if (CollectionUtils.isEmpty(resList)) {
            return RestResponse.fail("文件不存在");
        }
        resList.get(0).setImgData(null);
        log.info("[WorkerFileController]fileQuery, resList:{}", JSON.toJSONString(resList));
        return RestResponse.ok(resList.get(0));
    }

    @RequestMapping(value = "/addOrUpdate/processOn", method = RequestMethod.POST)
    public RestResponse<SubjectEditRequestVM> addOrUpdate(@RequestBody WorkbenchFileInfo param) {

//        log.info("[WorkerFileController]addOrUpdate, params:{}", JSON.toJSONString(param));
//        User user = getCurrentUser();

        User user = getCurrentUser();


        JdkFolderFile req = new JdkFolderFile();
        req.setIsFolder(0L);
        req.setFileName(param.getFileName());
        req.setUserId(Long.valueOf(user.getId()));
        req.setParentId(param.getParentId());

        JdkFolderFile res = jdkFolderFileService.selectJdkFolderFileOne(req);

        JdkFolderFile jdkFolderFile = new JdkFolderFile();
        //数据库存在文件，则更新
        if (Objects.nonNull(res)) {
            jdkFolderFile.setId(res.getId());
        }

        if (StringUtils.isNotBlank(param.getImgData())) {
            jdkFolderFileService.saveProcessOnFilePic(param, jdkFolderFile);
        }

        jdkFolderFile.setUserId(Long.valueOf(user.getId()));
        jdkFolderFile.setFileName(param.getFileName());
        jdkFolderFile.setFileData(param.getContent());
        jdkFolderFile.setImgData(param.getImgData());
        jdkFolderFile.setParentId(param.getParentId());
        jdkFolderFile.setIsFolder(0L);
        jdkFolderFile.setRecordType("processOn");
        jdkFolderFileService.saveOrUpdateJdkFolderFile(jdkFolderFile);
        return RestResponse.ok();
    }

}
