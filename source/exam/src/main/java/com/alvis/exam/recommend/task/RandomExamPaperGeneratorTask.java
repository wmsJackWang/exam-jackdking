package com.alvis.exam.recommend.task;

import com.alvis.exam.constants.ExamConstant;
import com.alvis.exam.domain.ExamPaper;
import com.alvis.exam.domain.Question;
import com.alvis.exam.domain.TextContent;
import com.alvis.exam.domain.User;
import com.alvis.exam.domain.question.QuestionObject;
import com.alvis.exam.service.ExamPaperService;
import com.alvis.exam.service.QuestionService;
import com.alvis.exam.service.TextContentService;
import com.alvis.exam.utility.*;
import com.alvis.exam.viewmodel.admin.exam.ExamPaperEditRequestVM;
import com.alvis.exam.viewmodel.admin.exam.ExamPaperTitleItemVM;
import com.alvis.exam.viewmodel.admin.question.QuestionPageRequestVM;
import com.alvis.exam.viewmodel.admin.question.QuestionResponseVM;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/*
 * 定时任务 从选题中随机选取来创建题型
 */
@Component
@Slf4j
public class RandomExamPaperGeneratorTask {

    @Resource
    private ExamPaperService examPaperService;

    @Resource
    private QuestionService questionService;

    @Resource
    private TextContentService textContentService;

    private final static ModelMapper modelMapper = ModelMapperSingle.Instance();

    private int i ;

    @Scheduled(cron = "*/2 * * * * ?")
    public void createRandomPaper() {
        log.info("thread id:{},FixedPrintTask execute times:{}", Thread.currentThread().getId(), ++i);

        ExamPaperEditRequestVM randomExamPaper = createRandomExamPaper();
        User defaultUser = getDefaultUser();
        ExamPaper examPaper = examPaperService.savePaperFromVM(randomExamPaper, defaultUser);

    }

    private ExamPaperEditRequestVM createRandomExamPaper() {

        ExamPaperEditRequestVM randomExamPaper = new ExamPaperEditRequestVM();
        randomExamPaper.setLevel(ExamConstant.randomLevel);
        randomExamPaper.setLimitDateTime(null);
        randomExamPaper.setName(ExamConstant.randomPaperNamePrefix+System.currentTimeMillis());
        randomExamPaper.setPaperType(ExamConstant.randomPaperType);
        randomExamPaper.setSubjectId(ExamConstant.randomPaperSubjectId);
        randomExamPaper.setSuggestTime(ExamConstant.randomSuggestTime);

        QuestionPageRequestVM model = new QuestionPageRequestVM();
        model.setPageSize(questionService.selectAllCount());
        PageInfo<Question> pageInfo = questionService.page(model);
        PageInfo<QuestionResponseVM> page = PageInfoHelper.copyMap(pageInfo, q -> {
            QuestionResponseVM vm = modelMapper.map(q, QuestionResponseVM.class);
            vm.setCreateTime(DateTimeUtil.dateFormat(q.getCreateTime()));
            vm.setScore(ExamUtil.scoreToVM(q.getScore()));
            TextContent textContent = textContentService.selectById(q.getInfoTextContentId());
            QuestionObject questionObject = JsonUtil.toJsonObject(textContent.getContent(), QuestionObject.class);
            String clearHtml = HtmlUtil.clear(questionObject.getTitleContent());
            vm.setShortTitle(clearHtml);
            return vm;
        });

        List<ExamPaperTitleItemVM> result = Optional.ofNullable(page.getList()).orElse(Collections.emptyList())
                .stream()
                .map(questionResponseVM -> {
                    ExamPaperTitleItemVM examPaperTitleItemVM = new ExamPaperTitleItemVM();
                    return examPaperTitleItemVM;
                }).collect(Collectors.toList());

        randomExamPaper.setTitleItems(result);

        model.setPageSize(examPaperService.selectAllCount());//试卷页面数据设置最大，查出所有数据。


        return randomExamPaper;
    }

    private User getDefaultUser() {
        User defaultUser = new User();
        defaultUser.setId(2);
        return defaultUser;
    }

}
