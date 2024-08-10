package com.alvis.exam.domain;

import lombok.Data;

/**
 * 画图文件对象 jdk_folder_file
 *
 * @author jackdking
 * @date 2024-08-09
 */
@Data
public class JdkFolderFile
{
    private static final long serialVersionUID = 1L;

    /** 版本 */
    private Long version;

    /** 0--未删除 1--已删除 DIC_NAME=DELETE_FLAG */
    private Long deleteFlag;

    /** 0--文件夹1--文件  */
    private Long isFolder;

    /** 0--已禁用 1--已启用  DIC_NAME=ENABLE_FLAG */
    private Long enableFlag;

    /** 文件数据 */
    private String fileData;

    /** 用户id */
    private Long userId;

    /** 文件名 */
    private String fileName;

    /** 文件类型：数据文件或文件夹 */
    private Long reocrdType;

    /** 父文件夹id */
    private Long parentId;

    /** 文件描述 */
    private String fileDesc;

    /** 主键 */
    private Long id;
}
