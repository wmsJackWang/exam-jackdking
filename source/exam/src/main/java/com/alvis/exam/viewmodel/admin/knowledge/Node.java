package com.alvis.exam.viewmodel.admin.knowledge;

import lombok.Data;

@Data
public class Node {
    Integer id;
    String name;
    String categary;
    String symbolSize;
    Integer deepGrade;
    String content;
    String knowledgeType;
}
