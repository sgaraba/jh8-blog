package com.esempla.jh8.web.rest;

import com.esempla.jh8.domain.BlogEntry;
import com.esempla.jh8.repository.BlogEntryRepository;
import com.esempla.jh8.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.esempla.jh8.domain.BlogEntry}.
 */
@RestController
@RequestMapping("/api/blog-entries")
@Transactional
public class BlogEntryResource {

    private final Logger log = LoggerFactory.getLogger(BlogEntryResource.class);

    private static final String ENTITY_NAME = "blogEntry";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BlogEntryRepository blogEntryRepository;

    public BlogEntryResource(BlogEntryRepository blogEntryRepository) {
        this.blogEntryRepository = blogEntryRepository;
    }

    /**
     * {@code POST  /blog-entries} : Create a new blogEntry.
     *
     * @param blogEntry the blogEntry to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new blogEntry, or with status {@code 400 (Bad Request)} if the blogEntry has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<BlogEntry> createBlogEntry(@Valid @RequestBody BlogEntry blogEntry) throws URISyntaxException {
        log.debug("REST request to save BlogEntry : {}", blogEntry);
        if (blogEntry.getId() != null) {
            throw new BadRequestAlertException("A new blogEntry cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BlogEntry result = blogEntryRepository.save(blogEntry);
        return ResponseEntity
            .created(new URI("/api/blog-entries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /blog-entries/:id} : Updates an existing blogEntry.
     *
     * @param id the id of the blogEntry to save.
     * @param blogEntry the blogEntry to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated blogEntry,
     * or with status {@code 400 (Bad Request)} if the blogEntry is not valid,
     * or with status {@code 500 (Internal Server Error)} if the blogEntry couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<BlogEntry> updateBlogEntry(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody BlogEntry blogEntry
    ) throws URISyntaxException {
        log.debug("REST request to update BlogEntry : {}, {}", id, blogEntry);
        if (blogEntry.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, blogEntry.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!blogEntryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        BlogEntry result = blogEntryRepository.save(blogEntry);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, blogEntry.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /blog-entries/:id} : Partial updates given fields of an existing blogEntry, field will ignore if it is null
     *
     * @param id the id of the blogEntry to save.
     * @param blogEntry the blogEntry to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated blogEntry,
     * or with status {@code 400 (Bad Request)} if the blogEntry is not valid,
     * or with status {@code 404 (Not Found)} if the blogEntry is not found,
     * or with status {@code 500 (Internal Server Error)} if the blogEntry couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<BlogEntry> partialUpdateBlogEntry(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody BlogEntry blogEntry
    ) throws URISyntaxException {
        log.debug("REST request to partial update BlogEntry partially : {}, {}", id, blogEntry);
        if (blogEntry.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, blogEntry.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!blogEntryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<BlogEntry> result = blogEntryRepository
            .findById(blogEntry.getId())
            .map(existingBlogEntry -> {
                if (blogEntry.getTitle() != null) {
                    existingBlogEntry.setTitle(blogEntry.getTitle());
                }
                if (blogEntry.getContent() != null) {
                    existingBlogEntry.setContent(blogEntry.getContent());
                }
                if (blogEntry.getDate() != null) {
                    existingBlogEntry.setDate(blogEntry.getDate());
                }

                return existingBlogEntry;
            })
            .map(blogEntryRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, blogEntry.getId().toString())
        );
    }

    /**
     * {@code GET  /blog-entries} : get all the blogEntries.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of blogEntries in body.
     */
    @GetMapping("")
    public ResponseEntity<List<BlogEntry>> getAllBlogEntries(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get a page of BlogEntries");
        Page<BlogEntry> page;
        if (eagerload) {
            page = blogEntryRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = blogEntryRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /blog-entries/:id} : get the "id" blogEntry.
     *
     * @param id the id of the blogEntry to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the blogEntry, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<BlogEntry> getBlogEntry(@PathVariable("id") Long id) {
        log.debug("REST request to get BlogEntry : {}", id);
        Optional<BlogEntry> blogEntry = blogEntryRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(blogEntry);
    }

    /**
     * {@code DELETE  /blog-entries/:id} : delete the "id" blogEntry.
     *
     * @param id the id of the blogEntry to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlogEntry(@PathVariable("id") Long id) {
        log.debug("REST request to delete BlogEntry : {}", id);
        blogEntryRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
