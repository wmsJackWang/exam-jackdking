package com.alvis.exam.service.impl;

import java.util.List;
import java.util.Objects;

import com.alvis.exam.domain.JdkFolderFile;
import com.alvis.exam.repository.JdkFolderFileMapper;
import com.alvis.exam.service.JdkFolderFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

/**
 * 画图文件Repository业务层处理
 *
 * @author jackdking
 * @date 2024-08-09
 */
@Service
public class JdkFolderFileServiceImpl implements JdkFolderFileService
{
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

    @Override
    public List<JdkFolderFile> selectJdkFolderFilePageList(JdkFolderFile jdkFolderFile) {
        return jdkFolderFileMapper.selectJdkFolderFilePageList(jdkFolderFile);
    }

    @Override
    public int saveOrUpdateJdkFolderFile(JdkFolderFile jdkFolderFile) {
        if (Objects.nonNull(jdkFolderFile.getId())) {
            return jdkFolderFileMapper.insertJdkFolderFile(jdkFolderFile);
        }else {
            return jdkFolderFileMapper.updateJdkFolderFile(jdkFolderFile);
        }
    }

    @Override
    public int deleteJdkFolderFileById(Long id) {
        return jdkFolderFileMapper.deleteJdkFolderFileById(id);
    }
}
