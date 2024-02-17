package com.alvis.exam.repository;

import com.alvis.exam.domain.KonwledgeStore;
import com.alvis.exam.domain.ResumeTemplate;
import com.alvis.exam.dto.ResumeTemplateDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 简历模板数据Dao接口
 *
 * @author jackdking
 * @date 2024-02-17
 */
@Mapper
public interface ResumeTemplateDao extends BaseMapper<ResumeTemplate>
{
    /**
     * 查询简历模板数据
     *
     * @param id 简历模板数据ID
     * @return 简历模板数据
     */
    public ResumeTemplate selectResumeTemplateById(Long id);

    /**
     * 查询简历模板数据列表
     *
     * @param resumeTemplate 简历模板数据
     * @return 简历模板数据集合
     */
    public List<ResumeTemplate> selectResumeTemplateList(ResumeTemplate resumeTemplate);

    /**
     * 查询简历模板数据列表
     *
     * @param resumeTemplateDto 简历模板数据
     * @return 简历模板数据集合
     */
    public List<ResumeTemplate> selectResumeTemplatePageList(ResumeTemplateDTO resumeTemplateDto);

    /**
     * 新增简历模板数据
     *
     * @param resumeTemplate 简历模板数据
     * @return 结果
     */
    public int insertResumeTemplate(ResumeTemplate resumeTemplate);

    /**
     * 修改简历模板数据
     *
     * @param resumeTemplate 简历模板数据
     * @return 结果
     */
    public int updateResumeTemplate(ResumeTemplate resumeTemplate);

    /**
     * 删除简历模板数据
     *
     * @param id 简历模板数据ID
     * @return 结果
     */
    public int deleteResumeTemplateById(Long id);

    /**
     * 批量删除简历模板数据
     *
     * @param ids 需要删除的数据ID
     * @return 结果
     */
    public int deleteResumeTemplateByIds(String[] ids);
}
