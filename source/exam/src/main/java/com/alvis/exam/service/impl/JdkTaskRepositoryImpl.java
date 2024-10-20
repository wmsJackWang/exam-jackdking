package com.alvis.exam.service.impl;

import com.alvis.exam.domain.JdkTask;
import com.alvis.exam.repository.JdkTaskMapper;
import com.alvis.exam.service.JdkTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * 任务Repository业务层处理
 *
 * @author jackdking
 * @date 2024-10-20
 */
@Repository
public class JdkTaskRepositoryImpl implements JdkTaskRepository
{
    @Autowired
    private JdkTaskMapper jdkTaskMapper;


    @Override
    public JdkTask selectJdkTaskById(Long id) {
        return jdkTaskMapper.selectJdkTaskById(id);
    }

    @Override
    public List<JdkTask> selectJdkTaskList(JdkTask jdkTask) {
        return jdkTaskMapper.selectJdkTaskList(jdkTask);
    }

    @Override
    public List<JdkTask> selectJdkTaskPageList(JdkTask jdkTaskDto) {
        return jdkTaskMapper.selectJdkTaskPageList(jdkTaskDto);
    }

    @Override
    public int saveOrUpdateJdkTask(JdkTask jdkTask) {
        if (Objects.isNull(jdkTask.getId())) {

            return jdkTaskMapper.insertJdkTask(jdkTask);
        }else {

            return jdkTaskMapper.updateJdkTask(jdkTask);
        }
    }

    @Override
    public int deleteJdkTaskByIds(String ids) {
        return jdkTaskMapper.deleteJdkTaskByIds(ids.split(","));
    }

    @Override
    public int deleteJdkTaskById(Long id) {
        return jdkTaskMapper.deleteJdkTaskById(id);
    }
}
