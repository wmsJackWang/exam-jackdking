package com.alvis.exam.enums;

import lombok.Getter;

public enum PaperShowTabEnum {
    
    RANDOM_SORT_PAPER(2, "随机排序试卷"),
    TIME_SORT_PAPER(2, "固定排序试卷-按时间倒排序"),
    TIME_AREA_PAPER(4, "时段试卷"),
    SUBJECT_TYPE_PAPER(5, "科目分类"),
    RANDOM_CREATE_PAPER(3, "随机生成的试卷")
    ;

    @Getter
    int code;

    @Getter
    String desc;

    PaperShowTabEnum(int code, String desc) {
        this.code = code;
        this.desc = desc;
    }
}
