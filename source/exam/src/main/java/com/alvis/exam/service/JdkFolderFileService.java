package com.alvis.exam.service;

import com.alvis.exam.domain.JdkFolderFile;

import java.util.List;

/**
 * 画图文件Repository接口
 *
 * @author jackdking
 * @date 2024-08-09
 */
public interface JdkFolderFileService
{
    /**
     * 查询画图文件
     *
     * @param id 画图文件ID
     * @return 画图文件
     */
    public JdkFolderFile selectJdkFolderFileById(Long id);

    /**
     * 查询画图文件列表
     *
     * @param jdkFolderFile 画图文件
     * @return 画图文件集合
     */
    public List<JdkFolderFile> selectJdkFolderFileList(JdkFolderFile jdkFolderFile);

    /**
     * 分页查询画图文件列表
     *
     * @param jdkFolderFile 画图文件
     * @return 画图文件集合
     */
    public List<JdkFolderFile> selectJdkFolderFilePageList(JdkFolderFile jdkFolderFile);

    /**
     * 新增画图文件
     *
     * @param jdkFolderFile 画图文件
     * @return 结果
     */
    public int saveOrUpdateJdkFolderFile(JdkFolderFile jdkFolderFile);

    /**
     * 删除画图文件信息
     *
     * @param id 画图文件ID
     * @return 结果
     */
    public int deleteJdkFolderFileById(Long id);
}
