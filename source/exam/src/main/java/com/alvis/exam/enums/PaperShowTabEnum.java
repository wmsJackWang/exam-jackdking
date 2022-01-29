package com.alvis.exam.enums;

import lombok.Getter;

public enum PaperShowTabEnum {
    
    RANDOM_SORT_PAPER(2, 1,"随机排序试卷"),
    TIME_SORT_PAPER(2, 1,"固定排序试卷-按时间倒排序"),
    TIME_AREA_PAPER(4, 6,"时段试卷"),
    SUBJECT_TYPE_PAPER(5, 1,"科目分类"),
    RANDOM_CREATE_PAPER(3, 1,"随机生成的试卷-每日试卷")
    ;

    @Getter
    int code;

    @Getter
    int paperType;

    @Getter
    String desc;

    PaperShowTabEnum(int code, int paperType, String desc) {
        this.code = code;
        this.desc = desc;
        this.paperType = paperType;
    }
}
