package com.alvis.exam.service.impl;

import java.sql.Array;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

import com.alvis.exam.domain.KonwledgeStore;
import com.alvis.exam.domain.TextContent;
import com.alvis.exam.repository.KonwledgeStoreMapper;
import com.alvis.exam.service.IKonwledgeStoreService;
import com.alvis.exam.service.TextContentService;
import com.alvis.exam.utility.Convert;
import com.alvis.exam.utility.DateTimeUtil;
import com.alvis.exam.viewmodel.admin.knowledge.KnowledgeGraphVm;
import com.alvis.exam.viewmodel.admin.knowledge.Link;
import com.alvis.exam.viewmodel.admin.knowledge.Node;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.sun.xml.internal.fastinfoset.tools.XML_SAX_StAX_FI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 【请填写功能名称】Service业务层处理
 * 
 * @author ruoyi
 * @date 2022-03-20
 */
@Service
public class KonwledgeStoreServiceImpl implements IKonwledgeStoreService
{
    @Autowired
    private KonwledgeStoreMapper konwledgeStoreMapper;

    @Autowired
    private TextContentService textContentService;

    /**
     * 查询【请填写功能名称】
     * 
     * @param id 【请填写功能名称】ID
     * @return 【请填写功能名称】
     */
    @Override
    public KonwledgeStore selectKonwledgeStoreById(Long id)
    {
        return konwledgeStoreMapper.selectKonwledgeStoreById(id);
    }

    /**
     * 查询【请填写功能名称】列表
     * 
     * @param konwledgeStore 【请填写功能名称】
     * @return 【请填写功能名称】
     */
    @Override
    public List<KonwledgeStore> selectKonwledgeStoreList(KonwledgeStore konwledgeStore)
    {
        return konwledgeStoreMapper.selectKonwledgeStoreList(konwledgeStore);
    }

    /**
     * 新增【请填写功能名称】
     * 
     * @param konwledgeStore 【请填写功能名称】
     * @return 结果
     */
    @Override
    public int insertKonwledgeStore(KonwledgeStore konwledgeStore)
    {
        TextContent textContent = buildInsertTextContent(konwledgeStore);
        textContentService.insertByFilter(textContent);
        konwledgeStore.setContentId(Long.valueOf(textContent.getId()));
        return konwledgeStoreMapper.insertKonwledgeStore(konwledgeStore);
    }

    private TextContent buildInsertTextContent(KonwledgeStore konwledgeStore) {

        TextContent textContent = new TextContent();
        textContent.setCreateTime(new Date());
        textContent.setContent(konwledgeStore.getContent());
        return textContent;
    }

    private TextContent buildUpdateTextContent(KonwledgeStore konwledgeStore) {

        TextContent textContent = new TextContent();
        Optional.ofNullable(konwledgeStore.getInfotextcontentid())
                .ifPresent(o -> {
                    textContent.setId(o.intValue());
                });
        textContent.setContent(konwledgeStore.getContent());
        return textContent;
    }

    /**
     * 修改【请填写功能名称】
     * 
     * @param konwledgeStore 【请填写功能名称】
     * @return 结果
     */
    @Override
    public int updateKonwledgeStore(KonwledgeStore konwledgeStore)
    {
        TextContent textContent = buildUpdateTextContent(konwledgeStore);
        textContentService.updateByIdFilter(textContent);

        konwledgeStore.setUpdateTime(DateTimeUtil.getNowDate());
        return konwledgeStoreMapper.updateKonwledgeStore(konwledgeStore);
    }

    /**
     * 删除【请填写功能名称】对象
     * 
     * @param ids 需要删除的数据ID
     * @return 结果
     */
    @Override
    public int deleteKonwledgeStoreByIds(String ids)
    {
        return konwledgeStoreMapper.deleteKonwledgeStoreByIds(Convert.toStrArray(ids));
    }

    /**
     * 删除【请填写功能名称】信息
     * 
     * @param id 【请填写功能名称】ID
     * @return 结果
     */
    @Override
    public int deleteKonwledgeStoreById(Long id)
    {
        return konwledgeStoreMapper.deleteKonwledgeStoreById(id);
    }

    @Override
    public PageInfo<KonwledgeStore> studentPage(KonwledgeStore konwledgeStore) {
        return PageHelper.startPage(konwledgeStore.getPageIndex(), konwledgeStore.getPageSize(), "id desc").doSelectPageInfo(() ->
                konwledgeStoreMapper.selectKonwledgeStoreList(konwledgeStore));
    }

    @Override
    public KnowledgeGraphVm queryKnowledgeGraphNodes(List<Integer> knowledgeIds, Integer maxGraphDeep) {

        AtomicInteger atomicId = new AtomicInteger(0);
        List<Node> nodes = new ArrayList();
        List<Link> links = new ArrayList();
        Optional.ofNullable(knowledgeIds).orElseGet(Collections::emptyList)
                .parallelStream()
                .forEach(id -> {

                    KonwledgeStore konwledgeStore = konwledgeStoreMapper.selectKonwledgeStoreById(Long.valueOf(id));
                    Node node = new Node();
                    node.setDeepGrade(0);
                    node.setId(id);
                    node.setName(konwledgeStore.getShortText());
                    node.setContent(konwledgeStore.getContent());
                    node.setKnowledgeType(konwledgeStore.getKonwledgeType());

                    nodes.add(node);
                    getCurrentKnowledgeGraphNode(node, maxGraphDeep, atomicId, nodes, links);

                });

        return new KnowledgeGraphVm(nodes, links);
    }

    private void getCurrentKnowledgeGraphNode(Node node, Integer maxGraphDeep, AtomicInteger atomicId, List<Node> nodes, List<Link> links) {
        if (Objects.isNull(node) || node.getDeepGrade() > maxGraphDeep) {
            return;
        }
        KonwledgeStore query = new KonwledgeStore();
        query.setParentKonwledgeId(Long.valueOf(node.getId()));
        List<KonwledgeStore> konwledgeStoreList = konwledgeStoreMapper.selectKonwledgeStoreList(query);
        Optional.ofNullable(konwledgeStoreList).orElseGet(Collections::emptyList)
                .parallelStream()
                .forEach(konwledgeStore -> {
                    Node childNode = new Node();
                    childNode.setKnowledgeType(konwledgeStore.getKonwledgeType());
                    childNode.setName(konwledgeStore.getShortText());
                    childNode.setDeepGrade(node.getDeepGrade()+1);
                    childNode.setContent(konwledgeStore.getContent());

                    nodes.add(childNode);

                    Link link = new Link();
                    link.setName(childNode.getKnowledgeType());
                    link.setSource(node.getId().toString());
                    link.setTarget(childNode.getId().toString());
                    links.add(link);

                    getCurrentKnowledgeGraphNode(childNode, maxGraphDeep, atomicId, nodes, links);
                });

    }
}
