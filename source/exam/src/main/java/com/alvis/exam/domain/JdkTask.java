package com.alvis.exam.domain;

import lombok.Data;

import java.util.Date;

/**
 * 任务对象 jdk_task
 * 
 * @author jackdking
 * @date 2024-10-20
 */
@Data
public class JdkTask
{
    private static final long serialVersionUID = 1L;

    /** 版本 */
    private Long version;

    /** 0--未删除 1--已删除 DIC_NAME=DELETE_FLAG */
    private Long deleteFlag;

    /** 文件数据 */
    private String content;

    /** 用户id */
    private Long userId;

    /** 文件名 */
    private String taskType;

    /** 文件描述 */
    private String taskDesc;

    /** 扩展字段 */
    private String ext;

    /** 主键 */
    private Long id;

    private Date updateTime;

    private Date createTime;

    private String updateBy;

    private String createBy;

    private Integer taskStatus;

}
