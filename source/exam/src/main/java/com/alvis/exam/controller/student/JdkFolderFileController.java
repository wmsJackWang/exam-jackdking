package com.alvis.exam.controller.student;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.alibaba.fastjson.JSONObject;
import com.alvis.exam.base.BaseApiController;
import com.alvis.exam.base.RestResponse;
import com.alvis.exam.domain.JdkFolderFile;
import com.alvis.exam.service.JdkFolderFileService;
import jdk.nashorn.internal.ir.Optimistic;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
/**
 * 画图文件Controller
 *
 * @author jackdking
 * @date 2024-08-09
 */
@RestController
@RequestMapping(value = "/api/student/fileSystem")
@AllArgsConstructor
public class JdkFolderFileController extends BaseApiController {

    @Autowired
    JdkFolderFileService jdkFolderFileService;

    /**
     * 新增保存画图文件
     */
    @PostMapping("/saveOrUpdateJdkFolderFile")
    public RestResponse saveOrUpdateJdkFolderFile(JdkFolderFile jdkFolderFile){
        return jdkFolderFileService.saveOrUpdateJdkFolderFile(jdkFolderFile) == 1?RestResponse.ok():RestResponse.fail("创建失败");
    }


    @RequestMapping(value = "/folder/listFolderAndFile/{id}", method = RequestMethod.POST)
    public RestResponse<JSONObject> list(@PathVariable Long id) {

        JdkFolderFile req = new JdkFolderFile();
        req.setParentId(id);
        List<JdkFolderFile> queryFiles = jdkFolderFileService.selectJdkFolderFileList(req);

        List<JdkFolderFile> folders = Optional.ofNullable(queryFiles).orElseGet(Collections::emptyList)
                .stream()
                .filter(jdkFolderFile -> jdkFolderFile.getIsFolder() == 0)
                .collect(Collectors.toList());

        List<JdkFolderFile> files = Optional.ofNullable(queryFiles).orElseGet(Collections::emptyList)
                .stream()
                .filter(jdkFolderFile -> jdkFolderFile.getIsFolder() != 0)
                .collect(Collectors.toList());

        JSONObject result = new JSONObject();
        result.put("folders", folders);
        result.put("sysFiles", files);

        return RestResponse.ok(result);
    }
}
