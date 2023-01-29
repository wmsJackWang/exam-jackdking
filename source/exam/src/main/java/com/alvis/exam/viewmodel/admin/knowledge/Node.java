package com.alvis.exam.viewmodel.admin.knowledge;

import lombok.Data;

import java.util.Objects;


@Data
public class Node {
    Integer id;
    String name;
    String categary;
    Integer symbolSize;
    Integer deepGrade;
    String content;
    String knowledgeType;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        Node compareNode = (Node)o;
        if (this.id == compareNode.getId()) {
            return true;
        }
        return false;
    }

    @Override
    public int hashCode() {
        return this.id;
    }
}
