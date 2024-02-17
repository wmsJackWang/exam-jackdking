package com.alvis.exam.repository;

import com.alvis.exam.domain.ResumeTemplate;
import com.alvis.exam.domain.UserResume;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 简历数据Dao接口
 *
 * @author jackdking
 * @date 2024-02-17
 */
@Mapper
public interface UserResumeDao  extends BaseMapper<UserResume>
{
    /**
     * 查询简历数据
     *
     * @param id 简历数据ID
     * @return 简历数据
     */
    public UserResume selectUserResumeById(Long id);

    /**
     * 查询简历数据列表
     *
     * @param userResume 简历数据
     * @return 简历数据集合
     */
    public List<UserResume> selectUserResumeList(UserResume userResume);

    /**
     * 查询简历数据列表
     *
     * @param userResume 简历数据
     * @return 简历数据集合
     */
    public List<UserResume> selectUserResumePageList(UserResume userResume);

    /**
     * 新增简历数据
     *
     * @param userResume 简历数据
     * @return 结果
     */
    public int insertUserResume(UserResume userResume);

    /**
     * 修改简历数据
     *
     * @param userResume 简历数据
     * @return 结果
     */
    public int updateUserResume(UserResume userResume);

    /**
     * 删除简历数据
     *
     * @param id 简历数据ID
     * @return 结果
     */
    public int deleteUserResumeById(Long id);

    /**
     * 批量删除简历数据
     *
     * @param ids 需要删除的数据ID
     * @return 结果
     */
    public int deleteUserResumeByIds(String[] ids);
}
