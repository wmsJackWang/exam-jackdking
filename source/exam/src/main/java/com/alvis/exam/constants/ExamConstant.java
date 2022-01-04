package com.alvis.exam.constants;

public interface ExamConstant {

    ///系统默认的随机题目试卷，用于每日定时任务产生的试卷///
    int randomPaperSubjectId = 17;
    Integer randomLevel = 1;
    String randomPaperNamePrefix = "每日随机测试试卷";
    Integer randomPaperType = 1;
    Integer randomSuggestTime = 10;
}
