package com.alvis.exam.domain;

import lombok.Data;

import java.io.Serializable;

@Data
public class Subject implements Serializable {

    private static final long serialVersionUID = 8058095034457106501L;

    private Integer id;

    private String name;

    private Integer level;

    private String levelName;

    private Integer itemOrder;

    private Integer paperType;

    private Boolean deleted;

    private Integer userid;
}
