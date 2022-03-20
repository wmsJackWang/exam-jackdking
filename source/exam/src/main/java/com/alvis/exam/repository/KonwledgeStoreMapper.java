package com.alvis.exam.repository;

import com.alvis.exam.domain.KonwledgeStore;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 【请填写功能名称】Mapper接口
 * 
 * @author ruoyi
 * @date 2022-03-20
 */
@Mapper
public interface KonwledgeStoreMapper extends BaseMapper<KonwledgeStore>
{
    /**
     * 查询【请填写功能名称】
     * 
     * @param id 【请填写功能名称】ID
     * @return 【请填写功能名称】
     */
    public KonwledgeStore selectKonwledgeStoreById(Long id);

    /**
     * 查询【请填写功能名称】列表
     * 
     * @param konwledgeStore 【请填写功能名称】
     * @return 【请填写功能名称】集合
     */
    public List<KonwledgeStore> selectKonwledgeStoreList(KonwledgeStore konwledgeStore);

    /**
     * 新增【请填写功能名称】
     * 
     * @param konwledgeStore 【请填写功能名称】
     * @return 结果
     */
    public int insertKonwledgeStore(KonwledgeStore konwledgeStore);

    /**
     * 修改【请填写功能名称】
     * 
     * @param konwledgeStore 【请填写功能名称】
     * @return 结果
     */
    public int updateKonwledgeStore(KonwledgeStore konwledgeStore);

    /**
     * 删除【请填写功能名称】
     * 
     * @param id 【请填写功能名称】ID
     * @return 结果
     */
    public int deleteKonwledgeStoreById(Long id);

    /**
     * 批量删除【请填写功能名称】
     * 
     * @param ids 需要删除的数据ID
     * @return 结果
     */
    public int deleteKonwledgeStoreByIds(String[] ids);
}
