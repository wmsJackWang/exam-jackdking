package com.alvis.exam.recommend.task;

import com.alvis.exam.constants.ExamConstant;
import com.alvis.exam.domain.ExamPaper;
import com.alvis.exam.domain.ExamPaperQuestionCustomerAnswer;
import com.alvis.exam.domain.Question;
import com.alvis.exam.domain.User;
import com.alvis.exam.service.ExamPaperQuestionCustomerAnswerService;
import com.alvis.exam.service.ExamPaperService;
import com.alvis.exam.service.QuestionService;
import com.alvis.exam.service.TextContentService;
import com.alvis.exam.utility.ModelMapperSingle;
import com.alvis.exam.viewmodel.admin.exam.ExamPaperEditRequestVM;
import com.alvis.exam.viewmodel.admin.exam.ExamPaperTitleItemVM;
import com.alvis.exam.viewmodel.admin.question.QuestionEditRequestVM;
import com.alvis.exam.viewmodel.admin.question.QuestionPageRequestVM;
import com.alvis.exam.viewmodel.student.question.answer.QuestionPageStudentRequestVM;
import com.github.pagehelper.PageInfo;
import javafx.application.Application;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Component
@Slf4j
public class ExamPaperGeneratorFromWrongQuestionTask {

//        model.setCreateUser(getCurrentUser().getId());
//    PageInfo<ExamPaperQuestionCustomerAnswer> pageInfo = examPaperQuestionCustomerAnswerService.studentPage(model);

    @Resource
    private ExamPaperService examPaperService;

    @Resource
    private QuestionService questionService;

    @Resource
    private ExamPaperQuestionCustomerAnswerService examPaperQuestionCustomerAnswerService;

    private final static ModelMapper modelMapper = ModelMapperSingle.Instance();

    @Scheduled(cron = "0 0 8,18 * * ?")
    public void createRandomPaper() {
        log.info("thread id:{},FixedPrintTask execute times:{}", Thread.currentThread().getId());
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
        randomExamPaper.setName(ExamConstant.randomErrorPaperNamePrefix+formatDate);
        randomExamPaper.setPaperType(ExamConstant.randomPaperType);
        randomExamPaper.setSubjectId(ExamConstant.randomPaperSubjectId);
        randomExamPaper.setSuggestTime(ExamConstant.randomSuggestTime);

        QuestionPageStudentRequestVM model = new QuestionPageStudentRequestVM();
        model.setPageSize(examPaperQuestionCustomerAnswerService.selectAllCount());
        model.setPageIndex(0);//默认第一页，查出所有数据
        model.setCreateUser(ExamConstant.default_user_id);
        PageInfo<ExamPaperQuestionCustomerAnswer> pageInfo = examPaperQuestionCustomerAnswerService.studentPage(model);

        List<Integer> questionIdList = Optional.ofNullable(pageInfo.getList()).orElse(Collections.emptyList())
                .stream()
                .map(o -> {
                    return o.getQuestionId();
                }).distinct().collect(Collectors.toList());

        Collections.shuffle(questionIdList);
        List<Integer> subQuestionList = questionIdList.subList(0, 12);
        List<QuestionEditRequestVM> questionItems = subQuestionList.stream()
                .map(o -> {
                    return questionService.getQuestionEditRequestVM(o);
                }).collect(Collectors.toList());

        List<ExamPaperTitleItemVM> titleItems = new ArrayList<>();
        ExamPaperTitleItemVM examPaperTitleItemVM = new ExamPaperTitleItemVM();
        examPaperTitleItemVM.setName(ExamConstant.randomErrorPaperNamePrefix+formatDate);
        examPaperTitleItemVM.setQuestionItems(questionItems);
        titleItems.add(examPaperTitleItemVM);

        randomExamPaper.setTitleItems(titleItems);
        return randomExamPaper;
    }

    private User getDefaultUser() {
        User defaultUser = new User();
        defaultUser.setId(188);
        return defaultUser;
    }

}
