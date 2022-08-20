package com.alvis.exam.controller.wx.student;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.alvis.exam.base.RestResponse;
import com.alvis.exam.controller.wx.BaseWXApiController;
import com.alvis.exam.domain.*;
import com.alvis.exam.service.ExamPaperQuestionCustomerAnswerService;
import com.alvis.exam.service.IKonwledgeStoreService;
import com.alvis.exam.service.QuestionService;
import com.alvis.exam.service.TextContentService;
import com.alvis.exam.utility.PageInfoHelper;
import com.alvis.exam.viewmodel.admin.question.QuestionEditRequestVM;
import com.alvis.exam.viewmodel.student.exam.ExamPaperSubmitItemVM;
import com.alvis.exam.viewmodel.student.exam.KonwledgeStorePageResponseVM;
import com.alvis.exam.viewmodel.student.question.answer.QuestionAnswerVM;
import com.github.pagehelper.PageInfo;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

/**
 * 【请填写功能名称】Controller
 * 
 * @author ruoyi
 * @date 2022-03-20
 */
@Controller
@RequestMapping("/api/wx/student/konwledge")
public class KonwledgeStoreController extends BaseWXApiController
{

    @Autowired
    private IKonwledgeStoreService konwledgeStoreService;

    @Autowired
    private TextContentService textContentService;

    @Autowired
    private ExamPaperQuestionCustomerAnswerService examPaperQuestionCustomerAnswerService;

    @Autowired
    private QuestionService questionService;

    /**
     * 查询【请填写功能名称】列表
     */
    @PostMapping("/pageList")
    @ResponseBody
    public RestResponse<PageInfo<KonwledgeStorePageResponseVM>> list(KonwledgeStore konwledgeStore)
    {
        long userid = Optional.ofNullable(konwledgeStore.getUserid()).orElseGet(() -> Long.parseLong(getCurrentUser().getId().toString()));
        konwledgeStore.setUserid(userid);//获取当前用户下的知识list
        PageInfo<KonwledgeStore> pageInfo = konwledgeStoreService.studentPage(konwledgeStore);

        PageInfo<KonwledgeStorePageResponseVM> page = PageInfoHelper.copyMap(pageInfo, e -> {
            KonwledgeStorePageResponseVM vm = modelMapper.map(e, KonwledgeStorePageResponseVM.class);
            TextContent textContent = textContentService.selectById(Integer.valueOf(e.getContentId().toString()));
            Optional.ofNullable(e.getTagInfo())
                    .ifPresent(tagInfo -> {
                        TypeReference<List<KonwledgeTag>> tagInfoJsonParser = new TypeReference<List<KonwledgeTag>>(KonwledgeTag.class){};
                        List<KonwledgeTag> tagInfoList = JSON.parseObject(tagInfo, tagInfoJsonParser);
                        vm.setTagInfoList(tagInfoList);
                    });
            vm.setContent(textContent.getContent());
            return vm;
        });

        return RestResponse.ok(page);
    }


    /**
     * 查询【请填写功能名称】列表
     */
    @PostMapping("/pageListV2")
    @ResponseBody
    public RestResponse<Map<String, Object>> listV2(KonwledgeStore konwledgeStore)
    {
        Map<String, Object> result = new HashMap<>();
        long userid = Optional.ofNullable(konwledgeStore.getUserid()).orElseGet(() -> Long.parseLong(getCurrentUser().getId().toString()));
        konwledgeStore.setUserid(userid);//获取当前用户下的知识list
        PageInfo<KonwledgeStore> pageInfo = konwledgeStoreService.studentPage(konwledgeStore);

        PageInfo<KonwledgeStorePageResponseVM> page = PageInfoHelper.copyMap(pageInfo, e -> {
            KonwledgeStorePageResponseVM vm = modelMapper.map(e, KonwledgeStorePageResponseVM.class);
            TextContent textContent = textContentService.selectById(Integer.valueOf(e.getContentId().toString()));
            Optional.ofNullable(e.getTagInfo())
                    .ifPresent(tagInfo -> {
                        TypeReference<List<KonwledgeTag>> tagInfoJsonParser = new TypeReference<List<KonwledgeTag>>(KonwledgeTag.class){};
                        List<KonwledgeTag> tagInfoList = JSON.parseObject(tagInfo, tagInfoJsonParser);
                        vm.setTagInfoList(tagInfoList);
                    });
            vm.setContent(textContent.getContent());//内容
            vm.setInfotextcontentid(Long.parseLong(textContent.getId().toString()));//内容id
            return vm;
        });

        Integer titleType = getTitleType(konwledgeStore);

        Optional.ofNullable(titleType)
                .filter(o -> o==2)
                .ifPresent(o -> result.put("questionItem", getQuestionAnswerVm(konwledgeStore.getQuestionId())));

        Optional.ofNullable(titleType)
                .filter(o -> o==1)
                .ifPresent(o -> result.put("parentKonwledge", getParentKonwledge(konwledgeStore.getParentKonwledgeId())));

        result.put("page", page);
        result.put("titleType", titleType);


        return RestResponse.ok(result);
    }

    private KonwledgeStore getParentKonwledge(Long parentKonwledgeId) {
        KonwledgeStore parentKonwledgeStore = konwledgeStoreService.selectKonwledgeStoreById(parentKonwledgeId);
        TextContent textContent = textContentService.selectById(parentKonwledgeStore.getContentId().intValue());
        parentKonwledgeStore.setContent(textContent.getContent());
        return parentKonwledgeStore;
    }

    private QuestionAnswerVM getQuestionAnswerVm(Long questionId) {
        QuestionAnswerVM vm = new QuestionAnswerVM();
        ExamPaperQuestionCustomerAnswer examPaperQuestionCustomerAnswer = examPaperQuestionCustomerAnswerService.selectById(questionId.intValue());
        ExamPaperSubmitItemVM questionAnswerVM = examPaperQuestionCustomerAnswerService.examPaperQuestionCustomerAnswerToVM(examPaperQuestionCustomerAnswer);
        QuestionEditRequestVM questionVM = questionService.getQuestionEditRequestVM(examPaperQuestionCustomerAnswer.getQuestionId());
        vm.setQuestionVM(questionVM);
        vm.setQuestionAnswerVM(questionAnswerVM);
        return vm;
    }

    private Integer getTitleType(KonwledgeStore konwledgeStore) {
        if (Objects.nonNull(konwledgeStore.getQuestionId()) && Objects.isNull(konwledgeStore.getParentKonwledgeId())) {
            return 2;
        } else if (Objects.isNull(konwledgeStore.getQuestionId()) && Objects.nonNull(konwledgeStore.getParentKonwledgeId())) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * 新增保存【请填写功能名称】
     */
    @PostMapping("/add")
    @ResponseBody
    public RestResponse<Integer> addSave(KonwledgeStore konwledgeStore)
    {
        long userid = Optional.ofNullable(konwledgeStore.getUserid()).orElseGet(() -> Long.parseLong(getCurrentUser().getId().toString()));
        konwledgeStore.setUserid(userid);//获取当前用户下的知识list
        int result = konwledgeStoreService.insertKonwledgeStore(konwledgeStore);
        return RestResponse.ok(result);
    }

    /**
     * 更新【请填写功能名称】
     */
    @PostMapping("/update")
    @ResponseBody
    public RestResponse<Integer> update(KonwledgeStore konwledgeStore)
    {
        long userid = Optional.ofNullable(konwledgeStore.getUserid()).orElseGet(() -> Long.parseLong(getCurrentUser().getId().toString()));
        konwledgeStore.setUserid(userid);//获取当前用户下的知识list
        int result = konwledgeStoreService.updateKonwledgeStore(konwledgeStore);
        return RestResponse.ok(result);
    }


    public static <K, V> Map<K, V> parseToMap(String json,
                                              Class<K> keyType,
                                              Class<V> valueType) {
        return JSON.parseObject(json,
                new TypeReference<Map<K, V>>(keyType, valueType) {
                });
    }


    public static void main(String[] args) {

        // 可以这样使用
        String json = "{1:{\"name\":\"ddd\"},2:{\"name\":\"zzz\"}}";
        Map<Integer, Model> map = parseToMap(json, Integer.class, Model.class);
//        Assert.isTrue("ddd".equals(Objects.toString(map.get(1).name)));
        System.out.println(map.get(1).name);
//        Assert.isTrue("zzz".equals(Objects.toString(map.get(2).name)));
        System.out.println(map.get(2).name);

        String tagInfo = "[{\"id\":100}]";
        TypeReference<List<KonwledgeTag>> tagInfoJson = new TypeReference<List<KonwledgeTag>>(KonwledgeTag.class){};
        List<KonwledgeTag> konwledgeTagList = JSON.parseObject(tagInfo, tagInfoJson);
        System.out.println(konwledgeTagList.get(0).toString());

    }

    @Data
    static class Model{
        String name;
    }
}
