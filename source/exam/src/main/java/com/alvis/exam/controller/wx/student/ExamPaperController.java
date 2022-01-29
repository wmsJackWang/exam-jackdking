package com.alvis.exam.controller.wx.student;

import com.alvis.exam.base.RestResponse;
import com.alvis.exam.controller.wx.BaseWXApiController;
import com.alvis.exam.domain.ExamPaper;
import com.alvis.exam.domain.Subject;
import com.alvis.exam.enums.PaperShowTabEnum;
import com.alvis.exam.service.ExamPaperService;
import com.alvis.exam.service.SubjectService;
import com.alvis.exam.utility.DateTimeUtil;
import com.alvis.exam.utility.PageInfoHelper;
import com.alvis.exam.viewmodel.admin.exam.ExamPaperEditRequestVM;
import com.alvis.exam.viewmodel.student.exam.ExamPaperPageResponseVM;
import com.alvis.exam.viewmodel.student.exam.ExamPaperPageVM;
import com.github.pagehelper.PageInfo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;


@Controller("WXStudentExamController")
@RequestMapping(value = "/api/wx/student/exampaper")
@AllArgsConstructor
@ResponseBody
public class ExamPaperController extends BaseWXApiController {

    private final ExamPaperService examPaperService;
    private final SubjectService subjectService;

    @RequestMapping(value = "/select/{id}", method = RequestMethod.POST)
    public RestResponse<ExamPaperEditRequestVM> select(@PathVariable Integer id) {
        ExamPaperEditRequestVM vm = examPaperService.examPaperToVM(id);
        return RestResponse.ok(vm);
    }

    @RequestMapping(value = "/pageListV2", method = RequestMethod.POST)
    public RestResponse<PageInfo<ExamPaperPageResponseVM>> pageListV2(@Valid ExamPaperPageVM model) {

    }

    //按照前端tab类型来区分
    @RequestMapping(value = "/pageShowTabList", method = RequestMethod.POST)
    public RestResponse<PageInfo<ExamPaperPageResponseVM>> pageTabShowList(@Valid ExamPaperPageVM model) {
        model.setPageSize(examPaperService.selectAllCount());//试卷页面数据设置最大，查出所有数据。
        model.setLevelId(getCurrentUser().getUserLevel());
        PageInfo<ExamPaper> pageInfo = examPaperService.studentPage(model);
        PageInfo<ExamPaperPageResponseVM> page = PageInfoHelper.copyMap(pageInfo, e -> {
            ExamPaperPageResponseVM vm = modelMapper.map(e, ExamPaperPageResponseVM.class);
            Subject subject = subjectService.selectById(vm.getSubjectId());
            vm.setSubjectName(subject.getName());
            vm.setCreateTime(DateTimeUtil.dateFormat(e.getCreateTime()));
            return vm;
        });

        if (PaperShowTabEnum.SUBJECT_TYPE_PAPER.getCode() == model.getTabType()) {

            Map<String, List<ExamPaperPageResponseVM>> subjectName2PaperList = page.getList()
                    .stream()
                    .collect(Collectors.groupingBy(ExamPaperPageResponseVM::getSubjectName));

            List<String> subjectList = subjectName2PaperList.keySet().stream().collect(Collectors.toList());

            Optional.ofNullable(subjectList)
                    .ifPresent(Collections::shuffle);

            page.setList(
                    Optional.ofNullable(subjectList)
                            .orElse(Collections.emptyList())
                            .stream()
                            .map(subjectName2PaperList::get)
                            .flatMap(Collection::stream)
                            .collect(Collectors.toList())
            );
        }

        //随机排序 试卷
        if (PaperShowTabEnum.RANDOM_SORT_PAPER.getCode() == model.getTabType()) {
            Collections.shuffle(page.getList());
        }


        return RestResponse.ok(page);
    }

    @RequestMapping(value = "/pageList", method = RequestMethod.POST)
    public RestResponse<PageInfo<ExamPaperPageResponseVM>> pageList(@Valid ExamPaperPageVM model) {
    	model.setPageSize(examPaperService.selectAllCount());//试卷页面数据设置最大，查出所有数据。
        model.setLevelId(getCurrentUser().getUserLevel());
        PageInfo<ExamPaper> pageInfo = examPaperService.studentPage(model);
        PageInfo<ExamPaperPageResponseVM> page = PageInfoHelper.copyMap(pageInfo, e -> {
            ExamPaperPageResponseVM vm = modelMapper.map(e, ExamPaperPageResponseVM.class);
            Subject subject = subjectService.selectById(vm.getSubjectId());
            vm.setSubjectName(subject.getName());
            vm.setCreateTime(DateTimeUtil.dateFormat(e.getCreateTime()));
            return vm;
        });

        return RestResponse.ok(page);
    }
}
