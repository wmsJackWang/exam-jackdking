package com.alvis.exam.service.impl;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

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
        int result = konwledgeStoreMapper.insertKonwledgeStore(konwledgeStore);
        return result == 1 ? konwledgeStore.getId().intValue() : -1;
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
        return PageHelper.startPage(konwledgeStore.getPageIndex(), konwledgeStore.getPageSize(), "review_score desc ,id desc").doSelectPageInfo(() ->
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
                    TextContent textContent = textContentService.selectById(Integer.valueOf(konwledgeStore.getContentId().toString()));

                    Node node = new Node();
                    node.setDeepGrade(0);
                    node.setId(id);
                    node.setName(konwledgeStore.getShortText());
                    node.setContent(textContent.getContent());
                    node.setKnowledgeType(konwledgeStore.getKonwledgeType());
                    node.setInfotextcontentid(textContent.getId());

                    nodes.add(node);
                    Integer sonSize = getCurrentSonKnowledgeGraphNode(node, maxGraphDeep, atomicId, nodes, links);
                    node.setSymbolSize(getSymbolSize(20 + sonSize * 10));
                    getCurrentAncestorKnowledgeGraphNode(konwledgeStore, node, maxGraphDeep, sonSize+1, nodes, links);

                });
        List<Node> distinctNodes = Optional.ofNullable(nodes).orElseGet(Collections::emptyList)
                        .stream()
                        .filter(distinctByKey(item -> item.getId()))
                        .collect(Collectors.toList());

        List<Link> distinctLinks = Optional.ofNullable(links).orElseGet(Collections::emptyList)
                        .stream()
                        .distinct()
                        .collect(Collectors.toList());


        return new KnowledgeGraphVm(distinctNodes, distinctLinks);
    }

    private void getCurrentAncestorKnowledgeGraphNode(KonwledgeStore konwledgeStore, Node node, Integer maxGraphDeep, Integer size, List<Node> nodes, List<Link> links) {
        if (Objects.isNull(konwledgeStore.getParentKonwledgeId())) {
            return;
        }

        if (Objects.isNull(node) || node.getDeepGrade() > maxGraphDeep) {
            return;
        }

        KonwledgeStore parentKonwledge = konwledgeStoreMapper.selectKonwledgeStoreById(konwledgeStore.getParentKonwledgeId());
        TextContent textContent = textContentService.selectById(Integer.valueOf(konwledgeStore.getContentId().toString()));

        Node parentNode = new Node();
        parentNode.setId(parentKonwledge.getId().intValue());
        parentNode.setKnowledgeType(konwledgeStore.getKonwledgeType());
        parentNode.setName(parentKonwledge.getShortText());
        parentNode.setDeepGrade(node.getDeepGrade()+1);
        parentNode.setContent(textContent.getContent());
        parentNode.setSymbolSize(getSymbolSize(20 + size * 10));

        nodes.add(parentNode);

        Link link = new Link();
        link.setName(parentNode.getKnowledgeType());
        link.setTarget(node.getId().toString());
        link.setSource(parentNode.getId().toString());
        links.add(link);

        getCurrentAncestorKnowledgeGraphNode(parentKonwledge, parentNode, maxGraphDeep,size +1, nodes, links);
    }

    private Integer getSymbolSize(int i) {

        return i > 100 ? 100 : i;
    }

    // 自定义去重方法
    static <T> Predicate<T> distinctByKey(Function<? super T, ?> keyExtractor) {
        Map<Object, Boolean> seen = new ConcurrentHashMap<>();
        return t -> seen.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
    }

    private Integer getCurrentSonKnowledgeGraphNode(Node node, Integer maxGraphDeep, AtomicInteger atomicId, List<Node> nodes, List<Link> links) {
        if (Objects.isNull(node) || node.getDeepGrade() > maxGraphDeep) {
            return 0;
        }
        Integer size = 1;
        KonwledgeStore query = new KonwledgeStore();
        query.setParentKonwledgeId(Long.valueOf(node.getId()));
        List<KonwledgeStore> konwledgeStoreList = queryKnowledgeStoreList(query);
        if ((konwledgeStoreList == null || konwledgeStoreList.size() == 0)) {
            node.setSymbolSize(20);
            return size;
        }
        AtomicInteger allChildNodeSize = new AtomicInteger(0);
        Optional.ofNullable(konwledgeStoreList).orElseGet(Collections::emptyList)
                .parallelStream()
                .forEach(konwledgeStore -> {
                    TextContent textContent = textContentService.selectById(Integer.valueOf(konwledgeStore.getContentId().toString()));

                    Node childNode = new Node();
                    childNode.setId(konwledgeStore.getId().intValue());
                    childNode.setKnowledgeType(konwledgeStore.getKonwledgeType());
                    childNode.setName(konwledgeStore.getShortText());
                    childNode.setDeepGrade(node.getDeepGrade()+1);
                    childNode.setContent(textContent.getContent());
                    childNode.setInfotextcontentid(textContent.getId());

                    nodes.add(childNode);

                    Link link = new Link();
                    link.setName(childNode.getKnowledgeType());
                    link.setSource(node.getId().toString());
                    link.setTarget(childNode.getId().toString());
                    links.add(link);

                    Integer childNodeSize = getCurrentSonKnowledgeGraphNode(childNode, maxGraphDeep, atomicId, nodes, links);
                    childNode.setSymbolSize(getSymbolSize(20 + 10 * childNodeSize));
                    allChildNodeSize.getAndAdd(childNodeSize);
                });
        size = allChildNodeSize.get();
        return size;
    }

    private List<KonwledgeStore> queryKnowledgeStoreList(KonwledgeStore query) {
        query.setQueryRoot("1");
        return konwledgeStoreMapper.selectKonwledgeStoreList(query);
    }
}
