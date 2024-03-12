package com.esempla.jh8.repository;

import com.esempla.jh8.domain.BlogEntry;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface BlogEntryRepositoryWithBagRelationships {
    Optional<BlogEntry> fetchBagRelationships(Optional<BlogEntry> blogEntry);

    List<BlogEntry> fetchBagRelationships(List<BlogEntry> blogEntries);

    Page<BlogEntry> fetchBagRelationships(Page<BlogEntry> blogEntries);
}
