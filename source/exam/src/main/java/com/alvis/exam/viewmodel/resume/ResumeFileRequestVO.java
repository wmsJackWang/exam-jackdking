package com.alvis.exam.viewmodel.resume;

import lombok.Data;

@Data
public class ResumeFileRequestVO {

    String title;

    String fileContent;

    Long id;

    Long userId;
}
