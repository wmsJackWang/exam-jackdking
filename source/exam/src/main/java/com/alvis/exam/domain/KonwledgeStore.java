package com.alvis.exam.domain;

import com.alvis.exam.base.BasePage;
import lombok.Data;

import java.util.Date;

/**
 * 【请填写功能名称】对象 konwledge_store
 * 
 * @author ruoyi
 * @date 2022-03-20
 */
@Data
public class KonwledgeStore  extends BasePage {

    /** $column.columnComment */
    private Long id;

    /** $column.columnComment */
    private Long userid;

    /** $column.columnComment */
    private Long infotextcontentid;

    private Long contentId;

    private String content;

    /** $column.columnComment */
    private Long questionId;

    //父知识点id
    private Long parentKonwledgeId;

    //学科id
    private Long subjectId;

    //标签信息
    private String tagInfo;

    //知识类型QIRC
    private String konwledgeType;

    private Date updateTime;

    private Date createTime;

    public KonwledgeStore() {
        Date now = new Date();
        updateTime = now;
        createTime = now;
        setPageIndex(0);
        setPageSize(12);
    }
}
