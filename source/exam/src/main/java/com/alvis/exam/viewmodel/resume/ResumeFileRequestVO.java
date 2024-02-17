package com.alvis.exam.viewmodel.resume;

import com.alvis.exam.domain.resume.TemplateType;
import lombok.Data;

@Data
public class ResumeFileRequestVO {

    String title;

    String fileContent;

    Long id;

    Long userId;

    String type;

    String token;

    TemplateType template;
}
