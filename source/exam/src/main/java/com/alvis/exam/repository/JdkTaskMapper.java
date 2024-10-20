package com.alvis.exam.repository;

import com.alvis.exam.domain.JdkTask;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 任务Dao接口
 *
 * @author jackdking
 * @date 2024-10-20
 */
@Mapper
public interface JdkTaskMapper
{
    /**
     * 查询任务
     *
     * @param id 任务ID
     * @return 任务
     */
    public JdkTask selectJdkTaskById(Long id);

    /**
     * 查询任务列表
     *
     * @param jdkTask 任务
     * @return 任务集合
     */
    public List<JdkTask> selectJdkTaskList(JdkTask jdkTask);

    /**
     * 查询任务列表
     *
     * @param jdkTaskDto 任务
     * @return 任务集合
     */
    public List<JdkTask> selectJdkTaskPageList(JdkTask jdkTaskDto);

    /**
     * 新增任务
     *
     * @param jdkTask 任务
     * @return 结果
     */
    public int insertJdkTask(JdkTask jdkTask);

    /**
     * 修改任务
     *
     * @param jdkTask 任务
     * @return 结果
     */
    public int updateJdkTask(JdkTask jdkTask);

    /**
     * 删除任务
     *
     * @param id 任务ID
     * @return 结果
     */
    public int deleteJdkTaskById(Long id);

    /**
     * 批量删除任务
     *
     * @param ids 需要删除的数据ID
     * @return 结果
     */
    public int deleteJdkTaskByIds(String[] ids);

    /**
     * 统计任务总数
     *
     * @param jdkTaskDto 任务
     * @return 结果
     */
    int count(JdkTask jdkTaskDto);
}
