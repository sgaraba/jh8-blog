package com.esempla.jh8.repository;

import com.esempla.jh8.domain.BlogEntry;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class BlogEntryRepositoryWithBagRelationshipsImpl implements BlogEntryRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<BlogEntry> fetchBagRelationships(Optional<BlogEntry> blogEntry) {
        return blogEntry.map(this::fetchTags);
    }

    @Override
    public Page<BlogEntry> fetchBagRelationships(Page<BlogEntry> blogEntries) {
        return new PageImpl<>(fetchBagRelationships(blogEntries.getContent()), blogEntries.getPageable(), blogEntries.getTotalElements());
    }

    @Override
    public List<BlogEntry> fetchBagRelationships(List<BlogEntry> blogEntries) {
        return Optional.of(blogEntries).map(this::fetchTags).orElse(Collections.emptyList());
    }

    BlogEntry fetchTags(BlogEntry result) {
        return entityManager
            .createQuery(
                "select blogEntry from BlogEntry blogEntry left join fetch blogEntry.tags where blogEntry.id = :id",
                BlogEntry.class
            )
            .setParameter("id", result.getId())
            .getSingleResult();
    }

    List<BlogEntry> fetchTags(List<BlogEntry> blogEntries) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, blogEntries.size()).forEach(index -> order.put(blogEntries.get(index).getId(), index));
        List<BlogEntry> result = entityManager
            .createQuery(
                "select blogEntry from BlogEntry blogEntry left join fetch blogEntry.tags where blogEntry in :blogEntries",
                BlogEntry.class
            )
            .setParameter("blogEntries", blogEntries)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
