package com.alvis.exam.controller.student;

import com.alibaba.fastjson.JSONObject;
import com.alvis.exam.base.BaseApiController;
import com.alvis.exam.base.RestResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController("FileSystemController")
@RequestMapping(value = "/api/student/fileSystem")
@AllArgsConstructor
public class FileSystemController extends BaseApiController {

    @RequestMapping(value = "/folder/listFolderAndFile/{id}", method = RequestMethod.POST)
    public RestResponse<JSONObject> list(@PathVariable Long id) {
        List<Folder> folders = new ArrayList<>();
        Folder folder = new Folder("test");
        folders.add(folder);

        JSONObject result = new JSONObject();
        result.put("folders", folders);

        List<File> files = new ArrayList<>();
        File file = new File("test", "test");
        files.add(file);

        result.put("sysFiles", files);

        return RestResponse.ok(result);
    }

    @Data
    @AllArgsConstructor
    public static class Folder {
        String folderName;
    }

    @Data
    @AllArgsConstructor
    public static class File {
        String fileName;
        String fileUrl;
    }
}
