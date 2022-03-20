package com.alvis.exam.constants;

public interface ExamConstant {

    ///系统默认的随机题目试卷，用于每日定时任务产生的试卷///
    int randomPaperSubjectId = 17;
    Integer randomLevel = 1;
    String randomPaperNamePrefix = "每日随机测试试卷";
    String randomErrorPaperNamePrefix = "每日错题随机测试试卷";
    Integer randomPaperType = 2;
    Integer default_user_id = 188;
    Integer randomSuggestTime = 20;
    /**
     * UTF-8 字符集
     */
    public static final String UTF8 = "UTF-8";
    String blogArticleDetailUrl = "http://bittechblog.com/article/detail";
    String blogArticleListUrl = "http://bittechblog.com/page/json";
}
