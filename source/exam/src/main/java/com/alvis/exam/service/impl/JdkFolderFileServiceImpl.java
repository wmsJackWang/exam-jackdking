package com.alvis.exam.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

import com.alvis.exam.domain.JdkFolderFile;
import com.alvis.exam.domain.WorkbenchFileInfo;
import com.alvis.exam.repository.JdkFolderFileMapper;
import com.alvis.exam.service.JdkFolderFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

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
            jdkFolderFileMapper.updateJdkFolderFile(jdkFolderFile);
        }
        return jdkFolderFile;
    }

    @Override
    public int deleteJdkFolderFileById(Long id) {
        return jdkFolderFileMapper.deleteJdkFolderFileById(id);
    }

    @Override
    public void saveFilePic(WorkbenchFileInfo param, JdkFolderFile jdkFolderFile) {


    }
}
