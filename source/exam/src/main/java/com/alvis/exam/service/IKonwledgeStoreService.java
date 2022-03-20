package com.alvis.exam.service;

import com.alvis.exam.domain.KonwledgeStore;
import com.github.pagehelper.PageInfo;

import java.util.List;


/**
 * 【请填写功能名称】Service接口
 * 
 * @author ruoyi
 * @date 2022-03-20
 */
public interface IKonwledgeStoreService 
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
     * 批量删除【请填写功能名称】
     * 
     * @param ids 需要删除的数据ID
     * @return 结果
     */
    public int deleteKonwledgeStoreByIds(String ids);

    /**
     * 删除【请填写功能名称】信息
     * 
     * @param id 【请填写功能名称】ID
     * @return 结果
     */
    public int deleteKonwledgeStoreById(Long id);

    PageInfo<KonwledgeStore> studentPage(KonwledgeStore konwledgeStore);
}
