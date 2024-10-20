package com.alvis.exam.service;

import com.alvis.exam.domain.JdkTask;

import java.util.List;
/**
 * 任务Repository接口
 *
 * @author jackdking
 * @date 2024-10-20
 */
public interface JdkTaskRepository
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
     * 分页查询任务列表
     *
     * @param jdkTask 任务
     * @return 任务集合
     */
    public List<JdkTask> selectJdkTaskPageList(JdkTask jdkTaskDto);

    /**
     * 新增任务
     *
     * @param jdkTask 任务
     * @return 结果
     */
    public int saveOrUpdateJdkTask(JdkTask jdkTask);

    /**
     * 批量删除任务
     *
     * @param ids 需要删除的数据ID
     * @return 结果
     */
    public int deleteJdkTaskByIds(String ids);

    /**
     * 删除任务信息
     *
     * @param id 任务ID
     * @return 结果
     */
    public int deleteJdkTaskById(Long id);
}
