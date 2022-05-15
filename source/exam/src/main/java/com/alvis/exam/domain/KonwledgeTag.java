package com.alvis.exam.domain;

import lombok.Data;

import java.util.Date;

@Data
public class KonwledgeTag {
    String tagName;
    String id;
    String tagDesc;
    Long[] subjectIds;
    Date createTime;
    Date updateTime;
}
