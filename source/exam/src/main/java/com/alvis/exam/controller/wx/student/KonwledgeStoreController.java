package com.alvis.exam.controller.wx.student;

import com.alvis.exam.base.RestResponse;
import com.alvis.exam.controller.wx.BaseWXApiController;
import com.alvis.exam.domain.KonwledgeStore;
import com.alvis.exam.domain.Subject;
import com.alvis.exam.domain.TextContent;
import com.alvis.exam.service.IKonwledgeStoreService;
import com.alvis.exam.service.TextContentService;
import com.alvis.exam.utility.DateTimeUtil;
import com.alvis.exam.utility.PageInfoHelper;
import com.alvis.exam.viewmodel.student.exam.ExamPaperPageResponseVM;
import com.alvis.exam.viewmodel.student.exam.KonwledgeStorePageResponseVM;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;

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
            vm.setContent(textContent.getContent());
            return vm;
        });

        return RestResponse.ok(page);
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

}
