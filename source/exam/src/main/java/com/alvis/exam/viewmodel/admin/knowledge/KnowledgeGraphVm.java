package com.alvis.exam.viewmodel.admin.knowledge;

public class KnowledgeGraphVm <T, K>{
    private T nodes;
    private K links;

    public KnowledgeGraphVm(T t, K k) {
        this.nodes = t;
        this.links = k;
    }

    public void setLinks(K links) {
        this.links = links;
    }

    public K getLinks() {
        return links;
    }

    public void setNodes(T nodes) {
        this.nodes = nodes;
    }

    public T getNodes() {
        return nodes;
    }
}
