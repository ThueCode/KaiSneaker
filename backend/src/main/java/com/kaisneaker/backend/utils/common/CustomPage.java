package com.kaisneaker.backend.utils.common;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.function.Function;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import lombok.Getter;

@Getter
public class CustomPage<T> implements Page<T> {
    private int number;
    private int size;
    private long totalElements;
    private int totalPages;
    private boolean last;
    private List<T> content;
    private Sort sort;
    private boolean first;
    private boolean empty;

    public CustomPage(Collection<T> content, Pageable pageable, long totalElements) {
        this.number = pageable.getPageNumber();
        this.size = pageable.getPageSize();
        this.totalElements = totalElements;
        this.totalPages = (int) Math.ceil((double) totalElements / (double) size);
        this.last = pageable.getPageNumber() == this.totalPages - 1;
        this.content = List.copyOf(content);
        this.sort = pageable.getSort();
        this.first = pageable.getPageNumber() == 0;
        this.empty = this.content.isEmpty();
    }

    @Override
    public int getNumberOfElements() {
        return this.content.size();
    }

    @Override
    public boolean hasContent() {
        return !empty;
    }

    @Override
    public boolean hasNext() {
        return !last;
    }

    @Override
    public boolean hasPrevious() {
        return !first;
    }

    @Override
    public Pageable nextPageable() {
        return null;
    }

    @Override
    public Pageable previousPageable() {
        return null;
    }

    @Override
    public Iterator<T> iterator() {
        return this.content.iterator();
    }

    @Override
    public <U> Page<U> map(Function<? super T, ? extends U> converter) {
        return null;
    }

}