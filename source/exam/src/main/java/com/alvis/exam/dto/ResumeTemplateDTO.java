package com.alvis.exam.dto;

import lombok.Data;

/**
 * 简历模板数据对象 resume_template
 *
 * @author jackdking
 * @date 2024-02-17
 */
@Data
public class ResumeTemplateDTO {
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

    /** 路径数据 */
    private String path;

    /** 文件内容 */
    private String content;

    /** 热度 */
    private Double hot;

    /** 主键 */
    private Long id;


}
