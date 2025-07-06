package com.alvis.exam.service.impl;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import com.alibaba.fastjson.JSONObject;
import com.alvis.exam.domain.ExcalidrawFileInfo;
import com.alvis.exam.domain.JdkFolderFile;
import com.alvis.exam.domain.User;
import com.alvis.exam.domain.WorkbenchFileInfo;
import com.alvis.exam.repository.JdkFolderFileMapper;
import com.alvis.exam.service.JdkFolderFileService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;

/**
 * 画图文件Repository业务层处理
 *
 * @author jackdking
 * @date 2024-08-09
 */
@Service
public class JdkFolderFileServiceImpl implements JdkFolderFileService
{
    private final static String CACHE_NAME = "file_content";

    @Value("${mozhi.pic.path:imagePath}")
    public String imagePath;

    @Value("${mozhi.pic.prefix:}")
    public String imgPrefix;

    @Autowired
    private JdkFolderFileMapper jdkFolderFileMapper;

    @Override
    public JdkFolderFile selectJdkFolderFileById(Long id) {
        return jdkFolderFileMapper.selectJdkFolderFileById(id);
    }

    @Override
    public List<JdkFolderFile> selectJdkFolderFileList(JdkFolderFile jdkFolderFile) {
        return jdkFolderFileMapper.selectJdkFolderFileList(jdkFolderFile);
    }

//    @Cacheable(value = CACHE_NAME, key = "#jdkFolderFile.parentId + '_' + #jdkFolderFile.fileName + '_' + #jdkFolderFile.userId")
    @Override
    public JdkFolderFile selectJdkFolderFileOne(JdkFolderFile jdkFolderFile) {
        return jdkFolderFileMapper.selectJdkFolderFileOne(jdkFolderFile);
    }

    @Override
    public List<JdkFolderFile> selectJdkFolderFileListSimple(JdkFolderFile jdkFolderFile) {
        return jdkFolderFileMapper.selectJdkFolderFileListSimple(jdkFolderFile);
    }

    @Override
    public List<JdkFolderFile> selectCollectFileList(JdkFolderFile jdkFolderFile) {
        return jdkFolderFileMapper.selectCollectFileList(jdkFolderFile);
    }

    @Override
    public List<JdkFolderFile> selectRecentFileList(JdkFolderFile jdkFolderFile) {
        return jdkFolderFileMapper.selectRecentFileList(jdkFolderFile);
    }

    @Override
    public List<JdkFolderFile> selectJdkFolderFilePageList(JdkFolderFile jdkFolderFile) {
        return jdkFolderFileMapper.selectJdkFolderFilePageList(jdkFolderFile);
    }

    @Override
//    @CachePut(value = CACHE_NAME, key = "#jdkFolderFile.parentId + '_' + #jdkFolderFile.fileName + '_' + #jdkFolderFile.userId")
    public JdkFolderFile saveOrUpdateJdkFolderFile(JdkFolderFile jdkFolderFile) {
        if (Objects.isNull(jdkFolderFile.getId())) {
            jdkFolderFileMapper.insertJdkFolderFile(jdkFolderFile);
        }else {
            jdkFolderFile.setParentId(null);//更新情况下，parentId不需要修改
            jdkFolderFileMapper.updateJdkFolderFile(jdkFolderFile);
        }
        return jdkFolderFile;
    }

    @Override
    public int deleteJdkFolderFileById(Long id) {
        return jdkFolderFileMapper.deleteJdkFolderFileById(id);
    }


    @Override
    public void saveProcessOnFilePic(WorkbenchFileInfo param, JdkFolderFile jdkFolderFile) {

        String filePath = convertFileToPic(param.getFileName(), param.getImgData());
        param.setImgData(filePath);
    }

    private String convertFileToPic(String fileName, String imgData) {
        String uploadFilePath =  getUploadFilePath();
        String pathName = uploadFilePath + imagePath + "/" + fileName + ".png";

        // 移除Base64字符串的开头和结尾的空白符，并替换掉可能的换行符
        String data = imgData.split(",")[1];
        // 解码Base64字符串
        byte[] imageBytes = Base64.getDecoder().decode(data);

        // 将字节数组转换为BufferedImage
        try {
            BufferedImage img = ImageIO.read(new ByteArrayInputStream(imageBytes));
            File dic = new File(uploadFilePath + imagePath + "/" );
            if (!dic.exists()) {
                dic.mkdir();
            }

            // 输出图片到文件（或者进行其他处理）
            File outputFile = new File(pathName); // 指定输出文件路径和名称
            ImageIO.write(img, "png", outputFile); // 指定图片格式为PNG
            System.out.println("图片已保存到 " + pathName);
            return "/" + imagePath + "/" + fileName + ".png";
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void saveExcalidrawFilePic(ExcalidrawFileInfo param, JdkFolderFile jdkFolderFile) {

        String filePath = convertFileToPic(param.getContainerName(), param.getImgData());
        param.setImgData(filePath);
    }

    @Override
    public List<JSONObject> getFolderData(long l, User user) {

        JdkFolderFile req = new JdkFolderFile();
        req.setParentId(l);
        req.setUserId(Long.valueOf(user.getId()));
        List<JdkFolderFile> simpleFiles = selectJdkFolderFileListSimple(req);


        List<JdkFolderFile> queryFiles = Optional.ofNullable(simpleFiles).orElseGet(Collections::emptyList)
                .stream()
                .map(jdkFolderFile -> selectJdkFolderFileOne(jdkFolderFile))
                .collect(Collectors.toList());

        List<JdkFolderFile> folders = Optional.of(queryFiles).orElseGet(Collections::emptyList)
                .stream()
                .filter(jdkFolderFile -> StringUtils.equalsIgnoreCase(jdkFolderFile.getRecordType(), "folder"))
                .collect(Collectors.toList());

        List<JSONObject> data = Optional.ofNullable(folders).orElseGet(Collections::emptyList)
                .stream()
                .map(jdkFolderFile -> {
                    JSONObject ele = new JSONObject();
                    ele.put("id", jdkFolderFile.getId());
                    ele.put("label", jdkFolderFile.getFileName());
                    ele.put("children", getFolderData(jdkFolderFile.getId(), user));
                    return ele;
                }).collect(Collectors.toList());


        return data;
    }

    @Override
    public int moveFile(JdkFolderFile jdkFolderFile) {
        JdkFolderFile file = jdkFolderFileMapper.selectJdkFolderFileById(jdkFolderFile.getFileId());
        file.setParentId(jdkFolderFile.getDesFolderId());

        return jdkFolderFileMapper.updateJdkFolderFile(file);
    }

    public static void main(String[] args) {
        System.out.println(getUploadFilePath());
    }

    public static String getUploadFilePath() {
        File file = new File("");
        return file.getAbsolutePath() + "/";
    }
}
