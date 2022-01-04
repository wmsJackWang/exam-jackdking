package com.alvis.exam.controller.admin;

import com.alvis.exam.base.BaseApiController;
import com.alvis.exam.base.RestResponse;
import com.alvis.exam.domain.ExamPaper;
import com.alvis.exam.service.ExamPaperService;
import com.alvis.exam.utility.DateTimeUtil;
import com.alvis.exam.utility.PageInfoHelper;
import com.alvis.exam.viewmodel.admin.exam.ExamPaperPageRequestVM;
import com.alvis.exam.viewmodel.admin.exam.ExamPaperEditRequestVM;
import com.alvis.exam.viewmodel.admin.exam.ExamResponseVM;
import com.github.pagehelper.PageInfo;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController("AdminExamPaperController")
@RequestMapping(value = "/api/admin/exam/paper")
@AllArgsConstructor
public class ExamPaperController extends BaseApiController {

    private final ExamPaperService examPaperService;

    @RequestMapping(value = "/page", method = RequestMethod.POST)
    public RestResponse<PageInfo<ExamResponseVM>> pageList(@RequestBody ExamPaperPageRequestVM model) {
        PageInfo<ExamPaper> pageInfo = examPaperService.page(model);
        PageInfo<ExamResponseVM> page = PageInfoHelper.copyMap(pageInfo, e -> {
            ExamResponseVM vm = modelMapper.map(e, ExamResponseVM.class);
            vm.setCreateTime(DateTimeUtil.dateFormat(e.getCreateTime()));
            return vm;
        });
        return RestResponse.ok(page);
    }



    @RequestMapping(value = "/taskExamPage", method = RequestMethod.POST)
    public RestResponse<PageInfo<ExamResponseVM>> taskExamPageList(@RequestBody ExamPaperPageRequestVM model) {
        PageInfo<ExamPaper> pageInfo = examPaperService.taskExamPage(model);
        PageInfo<ExamResponseVM> page = PageInfoHelper.copyMap(pageInfo, e -> {
            ExamResponseVM vm = modelMapper.map(e, ExamResponseVM.class);
            vm.setCreateTime(DateTimeUtil.dateFormat(e.getCreateTime()));
            return vm;
        });
        return RestResponse.ok(page);
    }

    /*
     *  {
    "id":17,
    "level":1,
    "limitDateTime":null,
    "name":"架构师思考（一）",
    "paperType":1,
    "score":"21",
    "subjectId":10,
    "suggestTime":15,
    "titleItems":[
        {
            "name":"对知识的理解",
            "questionItems":[
                {
                    "analyze":"分析：知识",
                    "correct":"A,B",
                    "correctArray":Array[2],
                    "difficult":5,
                    "gradeLevel":1,
                    "id":109,
                    "itemOrder":1,
                    "items":[
                        Object{...},
                        Object{...}
                    ],
                    "questionType":2,
                    "score":"0",
                    "subjectId":10,
                    "title":"关于技术体系站在架构师位置来理解（知识型）"
                },
                {
                    "analyze":"分析：好好思考每一项，应用在生活、学习、工作中。",
                    "correct":"A,B",
                    "correctArray":Array[2],
                    "difficult":1,
                    "gradeLevel":1,
                    "id":206,
                    "itemOrder":2,
                    "items":Array[2],
                    "questionType":2,
                    "score":"1",
                    "subjectId":10,
                    "title":"思考、学习 的重要原理"
                },
                {
                    "analyze":"分析：知识",
                    "correct":"A,B",
                    "correctArray":Array[2],
                    "difficult":5,
                    "gradeLevel":1,
                    "id":109,
                    "itemOrder":3,
                    "items":Array[2],
                    "questionType":2,
                    "score":"0",
                    "subjectId":10,
                    "title":"关于技术体系站在架构师位置来理解（知识型）"
                },
                {
                    "analyze":"分析：全都是要考虑的点，但根据情况不同 会有优先级差别。",
                    "correct":"A,B,C,D,E,F",
                    "correctArray":Array[6],
                    "difficult":1,
                    "gradeLevel":1,
                    "id":205,
                    "itemOrder":4,
                    "items":Array[6],
                    "questionType":2,
                    "score":"1",
                    "subjectId":10,
                    "title":"架构师技术选型 思考范畴有哪些？"
                },
                {
                    "analyze":"分析：太TM需要了，这是吃过大亏的程序员的良心总结——好好保护自己。",
                    "correct":"A,B,C,D",
                    "correctArray":Array[4],
                    "difficult":1,
                    "gradeLevel":1,
                    "id":254,
                    "itemOrder":5,
                    "items":Array[4],
                    "questionType":2,
                    "score":"1",
                    "subjectId":10,
                    "title":"具体的需求文档（需求评审后的需求文档）对程序员来说的意义："
                },
                {
                    "analyze":"分析：好好保护你自己吧，否则出问题找你，加班找你，加需求找你，和测试理解不一样---也会找你。 总之会增加大量的成本，无论是沟通/时间/精力等。",
                    "correct":"A,B,C,D",
                    "correctArray":Array[4],
                    "difficult":3,
                    "gradeLevel":1,
                    "id":255,
                    "itemOrder":6,
                    "items":Array[5],
                    "questionType":2,
                    "score":"2",
                    "subjectId":10,
                    "title":"在一个团队中，如何说服开发人员重视 需求评审以及需求文档。"
                },
                {
                    "analyze":"分析：技术leader日常工作，可作为进步的参考。",
                    "correct":"A,B,C,D,E,F,G,H,I,J,K,L,M",
                    "correctArray":Array[13],
                    "difficult":5,
                    "gradeLevel":1,
                    "id":280,
                    "itemOrder":7,
                    "items":Array[13],
                    "questionType":2,
                    "score":"5",
                    "subjectId":10,
                    "title":"技术leader的工作内容有哪些？"
                },
                {
                    "analyze":"分析：技术leader的定位和职责，可作为进步的参考",
                    "correct":"A,B,C,D",
                    "correctArray":Array[4],
                    "difficult":3,
                    "gradeLevel":1,
                    "id":281,
                    "itemOrder":8,
                    "items":Array[4],
                    "questionType":2,
                    "score":"5",
                    "subjectId":10,
                    "title":"研发Leader的职责是？"
                },
                {
                    "analyze":"分析：是的。",
                    "correct":"A",
                    "correctArray":null,
                    "difficult":3,
                    "gradeLevel":1,
                    "id":282,
                    "itemOrder":9,
                    "items":Array[2],
                    "questionType":3,
                    "score":"2",
                    "subjectId":10,
                    "title":"从团队的角度说的，技术Leader有三大块职责：分配任务、保证质量、提升团队效率与专业。那么，技术Leader是一个开发团队的负责人，要履行好这三块职责，打造高绩效的团队，交付高质量的产品。"
                },
                {
                    "analyze":"分析:这些都是分配任务 内容<br/>",
                    "correct":"A,B,C,D,E",
                    "correctArray":Array[5],
                    "difficult":2,
                    "gradeLevel":1,
                    "id":283,
                    "itemOrder":10,
                    "items":Array[5],
                    "questionType":2,
                    "score":"1",
                    "subjectId":10,
                    "title":"分配任务这块 有哪些内容？"
                },
                {
                    "analyze":"分析：是的",
                    "correct":"A,B,C,D,E,F,G,H",
                    "correctArray":Array[8],
                    "difficult":4,
                    "gradeLevel":1,
                    "id":284,
                    "itemOrder":11,
                    "items":Array[8],
                    "questionType":2,
                    "score":"3",
                    "subjectId":10,
                    "title":"保证质量"
                }
            ]
        },
        {
            "name":"计算机的理解",
            "questionItems":[
                {
                    "analyze":"分析：高可用性 需要做的工作。",
                    "correct":"A,B,C,D,E,F,G,H,I,J,K,L,M,N,O",
                    "correctArray":Array[15],
                    "difficult":5,
                    "gradeLevel":1,
                    "id":378,
                    "itemOrder":null,
                    "items":Array[15],
                    "questionType":2,
                    "score":"2",
                    "subjectId":10,
                    "title":"提高系统高可用性的方法有哪些？"
                },
                {
                    "analyze":"分析：这是设计程序语言层面的 复杂性治理思想。",
                    "correct":"A,B,C,D",
                    "correctArray":Array[4],
                    "difficult":2,
                    "gradeLevel":1,
                    "id":403,
                    "itemOrder":null,
                    "items":Array[4],
                    "questionType":2,
                    "score":"1",
                    "subjectId":10,
                    "title":"复杂性的解法有哪些？"
                },
                {
                    "analyze":"分析：黑盒单元是具备通用性的。",
                    "correct":"B,C,D,E,F,G",
                    "correctArray":Array[6],
                    "difficult":4,
                    "gradeLevel":1,
                    "id":402,
                    "itemOrder":null,
                    "items":Array[7],
                    "questionType":2,
                    "score":"3",
                    "subjectId":10,
                    "title":"<p>关于计算机科学说话正确的是<br/></p>"
                }
            ]
        }
    ]
}
     * 设计方案：
     * 1. 创建ExamPaperEditRequestVM对象，对象创建内容参考json数据。
     * 2. 创建id为2的user对象
     * 3. 调用方法创建试卷 ：examPaperService.savePaperFromVM(model, getCurrentUser());
     * 4. 流程设置每天创建两个随机试卷。
     */

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public RestResponse<ExamPaperEditRequestVM> edit(@RequestBody @Valid ExamPaperEditRequestVM model) {
        ExamPaper examPaper = examPaperService.savePaperFromVM(model, getCurrentUser());
        ExamPaperEditRequestVM newVM = examPaperService.examPaperToVM(examPaper.getId());
        return RestResponse.ok(newVM);
    }

    @RequestMapping(value = "/select/{id}", method = RequestMethod.POST)
    public RestResponse<ExamPaperEditRequestVM> select(@PathVariable Integer id) {
        ExamPaperEditRequestVM vm = examPaperService.examPaperToVM(id);
        return RestResponse.ok(vm);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    public RestResponse delete(@PathVariable Integer id) {
        ExamPaper examPaper = examPaperService.selectById(id);
        examPaper.setDeleted(true);
        examPaperService.updateByIdFilter(examPaper);
        return RestResponse.ok();
    }
}
