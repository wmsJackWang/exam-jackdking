package com.alvis.exam.viewmodel.student.exam;

import lombok.Data;

import java.util.Date;

@Data
public class KonwledgeStorePageResponseVM {

    /** $column.columnComment */
    private Long id;

    /** $column.columnComment */
    private Long userid;

    /** $column.columnComment */
    private Long infotextcontentid;

    private String content;

    /** $column.columnComment */
    private Long questionId;

    private Date updateTime;

    private Date createTime;

}
