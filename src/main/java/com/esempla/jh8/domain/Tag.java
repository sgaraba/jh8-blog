package com.esempla.jh8.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Tag.
 */
@Entity
@Table(name = "tag")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Tag implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 2)
    @Column(name = "name", nullable = false)
    private String name;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "tags")
    @JsonIgnoreProperties(value = { "blog", "tags" }, allowSetters = true)
    private Set<BlogEntry> entries = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Tag id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Tag name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<BlogEntry> getEntries() {
        return this.entries;
    }

    public void setEntries(Set<BlogEntry> blogEntries) {
        if (this.entries != null) {
            this.entries.forEach(i -> i.removeTag(this));
        }
        if (blogEntries != null) {
            blogEntries.forEach(i -> i.addTag(this));
        }
        this.entries = blogEntries;
    }

    public Tag entries(Set<BlogEntry> blogEntries) {
        this.setEntries(blogEntries);
        return this;
    }

    public Tag addEntry(BlogEntry blogEntry) {
        this.entries.add(blogEntry);
        blogEntry.getTags().add(this);
        return this;
    }

    public Tag removeEntry(BlogEntry blogEntry) {
        this.entries.remove(blogEntry);
        blogEntry.getTags().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tag)) {
            return false;
        }
        return getId() != null && getId().equals(((Tag) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Tag{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
