package com.esempla.jh8.repository;

import com.esempla.jh8.domain.BlogEntry;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the BlogEntry entity.
 *
 * When extending this class, extend BlogEntryRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface BlogEntryRepository extends BlogEntryRepositoryWithBagRelationships, JpaRepository<BlogEntry, Long> {
    default Optional<BlogEntry> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findOneWithToOneRelationships(id));
    }

    default List<BlogEntry> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships());
    }

    default Page<BlogEntry> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships(pageable));
    }

    @Query(
        value = "select blogEntry from BlogEntry blogEntry left join fetch blogEntry.blog",
        countQuery = "select count(blogEntry) from BlogEntry blogEntry"
    )
    Page<BlogEntry> findAllWithToOneRelationships(Pageable pageable);

    @Query("select blogEntry from BlogEntry blogEntry left join fetch blogEntry.blog")
    List<BlogEntry> findAllWithToOneRelationships();

    @Query("select blogEntry from BlogEntry blogEntry left join fetch blogEntry.blog where blogEntry.id =:id")
    Optional<BlogEntry> findOneWithToOneRelationships(@Param("id") Long id);
}
