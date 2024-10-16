package com.alvis.exam.viewmodel.student.education;

import lombok.Data;

@Data
public class SubjectVM {
    private String id;

    private String name;

    private Integer paperType;

    private Boolean isPlatform = Boolean.FALSE;
}
