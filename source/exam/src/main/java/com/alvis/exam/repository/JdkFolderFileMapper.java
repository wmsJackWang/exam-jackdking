package com.alvis.exam.repository;

import com.alvis.exam.domain.JdkFolderFile;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 画图文件Dao接口
 *
 * @author jackdking
 * @date 2024-08-09
 */
@Mapper
public interface JdkFolderFileMapper
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
     * 查询画图文件列表
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
    public int insertJdkFolderFile(JdkFolderFile jdkFolderFile);

    /**
     * 修改画图文件
     *
     * @param jdkFolderFile 画图文件
     * @return 结果
     */
    public int updateJdkFolderFile(JdkFolderFile jdkFolderFile);

    /**
     * 删除画图文件
     *
     * @param id 画图文件ID
     * @return 结果
     */
    public int deleteJdkFolderFileById(Long id);

    /**
     * 批量删除画图文件
     *
     * @param ids 需要删除的数据ID
     * @return 结果
     */
    public int deleteJdkFolderFileByIds(String[] ids);

    /**
     * 统计画图文件总数
     *
     * @param jdkFolderFileDto 画图文件
     * @return 结果
     */
    int count(JdkFolderFile jdkFolderFile);
}
