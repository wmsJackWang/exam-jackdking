package com.alvis.exam.domain;

import lombok.Data;

@Data
public class TaskChangeReq {

    /** 用户id */
    private Long userId;

    private Long id;

    private String data;

}
