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
import com.alvis.exam.viewmodel.admin.question.QuestionEditRequestVM;
import com.alvis.exam.viewmodel.admin.question.QuestionPageRequestVM;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;
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

    @Scheduled(cron = "0 0 8,12,18,21 * * ?")
    public void createRandomPaper() {
        log.info("thread id:{},FixedPrintTask execute times:{}", Thread.currentThread().getId(), ++i);

        ExamPaperEditRequestVM randomExamPaper = createRandomExamPaper();
        User defaultUser = getDefaultUser();
        ExamPaper examPaper = examPaperService.savePaperFromVM(randomExamPaper, defaultUser);

    }

    private ExamPaperEditRequestVM createRandomExamPaper() {

        Date dt = new Date();
        DateFormat dFormat = new SimpleDateFormat("yyyy-MM-dd HH"); //HH表示24小时制；
        String formatDate = dFormat.format(dt);

        ExamPaperEditRequestVM randomExamPaper = new ExamPaperEditRequestVM();
        randomExamPaper.setLevel(ExamConstant.randomLevel);
        randomExamPaper.setLimitDateTime(null);
        randomExamPaper.setName(ExamConstant.randomPaperNamePrefix+formatDate);
        randomExamPaper.setPaperType(ExamConstant.randomPaperType);
        randomExamPaper.setSubjectId(ExamConstant.randomPaperSubjectId);
        randomExamPaper.setSuggestTime(ExamConstant.randomSuggestTime);

        QuestionPageRequestVM model = new QuestionPageRequestVM();
        model.setPageSize(questionService.selectAllCount());
        model.setPageIndex(0);//默认第一页，查出所有数据
        PageInfo<Question> pageInfo = questionService.page(model);

        List<Question> questionList = Optional.ofNullable(pageInfo.getList()).orElse(Collections.emptyList());
        Collections.shuffle(questionList);
        List<Question> subQuestionList = questionList.subList(0, 12);
        List<QuestionEditRequestVM> questionItems = subQuestionList.stream()
                .map(o -> {
                    return questionService.getQuestionEditRequestVM(o.getId());
                }).collect(Collectors.toList());

        List<ExamPaperTitleItemVM> titleItems = new ArrayList<>();
        ExamPaperTitleItemVM examPaperTitleItemVM = new ExamPaperTitleItemVM();
        examPaperTitleItemVM.setName(ExamConstant.randomPaperNamePrefix+formatDate);
        examPaperTitleItemVM.setQuestionItems(questionItems);
        titleItems.add(examPaperTitleItemVM);

        randomExamPaper.setTitleItems(titleItems);
        return randomExamPaper;
    }

    private User getDefaultUser() {
        User defaultUser = new User();
        defaultUser.setId(2);
        return defaultUser;
    }
}
