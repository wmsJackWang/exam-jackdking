package com.alvis.exam.domain;

import lombok.Data;

/**
 * 简历数据对象 user_resume
 * 
 * @author jackdking
 * @date 2024-02-17
 */
@Data
public class UserResume
{
    private static final long serialVersionUID = 1L;

    /** 模板类型 */
    private String type;

    /** 模板名称 */
    private String name;

    /** font内容 */
    private String font;

    /** 行高 */
    private Double lineheight;

    /** 字体颜色 */
    private String primaryColor;

    /** 背景颜色 */
    private String primaryBackground;

    /** 模板截图 */
    private String img;

    /** 文件内容 */
    private String content;

    /** 用户id */
    private Long userId;

    /** 主键 */
    private Long id;

}
