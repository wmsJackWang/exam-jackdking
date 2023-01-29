package com.alvis.exam.viewmodel.admin.knowledge;

import lombok.Data;

import java.util.List;

@Data
public class KnowledgeGraphRequestVm {
    List<Integer> knowledgeIds;
    Integer graphDeep;
}
