package com.alvis.exam.domain;

import lombok.Data;

import java.io.Serializable;

/**
 * Copyright (C) 阿里巴巴
 *
 * @ClassName ExcalidrawFileInfo
 * @Description TODO
 * @Author jackdking
 * @Date 2024/6/11 17:43
 * @Version 2.0
 **/
@Data
public class ExcalidrawFileInfo implements Serializable {

  String containerName;

  String elementsJson;

  String appStateJson;
}
