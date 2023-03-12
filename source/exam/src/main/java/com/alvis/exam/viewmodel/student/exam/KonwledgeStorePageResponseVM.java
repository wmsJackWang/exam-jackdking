package com.alvis.exam.viewmodel.student.exam;

import com.alibaba.fastjson.JSONObject;
import com.alvis.exam.domain.KonwledgeTag;
import lombok.Data;

import java.util.Date;
import java.util.List;

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

    //父知识点id
    private Long parentKonwledgeId;

    //学科id
    private Long subjectId;

    //标签信息
    private String tagInfo;

    //知识类型 QIRC
    private String konwledgeType;

    //简称
    private String shortText;

    //标签json
    private List<KonwledgeTag> tagInfoList;

    private Date updateTime;

    private Date createTime;

    private Long isChecked;

    private Long reviewScore;


}
