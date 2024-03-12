package com.esempla.jh8.domain;

import static com.esempla.jh8.domain.BlogEntryTestSamples.*;
import static com.esempla.jh8.domain.BlogTestSamples.*;
import static com.esempla.jh8.domain.TagTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.esempla.jh8.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class BlogEntryTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BlogEntry.class);
        BlogEntry blogEntry1 = getBlogEntrySample1();
        BlogEntry blogEntry2 = new BlogEntry();
        assertThat(blogEntry1).isNotEqualTo(blogEntry2);

        blogEntry2.setId(blogEntry1.getId());
        assertThat(blogEntry1).isEqualTo(blogEntry2);

        blogEntry2 = getBlogEntrySample2();
        assertThat(blogEntry1).isNotEqualTo(blogEntry2);
    }

    @Test
    void blogTest() throws Exception {
        BlogEntry blogEntry = getBlogEntryRandomSampleGenerator();
        Blog blogBack = getBlogRandomSampleGenerator();

        blogEntry.setBlog(blogBack);
        assertThat(blogEntry.getBlog()).isEqualTo(blogBack);

        blogEntry.blog(null);
        assertThat(blogEntry.getBlog()).isNull();
    }

    @Test
    void tagTest() throws Exception {
        BlogEntry blogEntry = getBlogEntryRandomSampleGenerator();
        Tag tagBack = getTagRandomSampleGenerator();

        blogEntry.addTag(tagBack);
        assertThat(blogEntry.getTags()).containsOnly(tagBack);

        blogEntry.removeTag(tagBack);
        assertThat(blogEntry.getTags()).doesNotContain(tagBack);

        blogEntry.tags(new HashSet<>(Set.of(tagBack)));
        assertThat(blogEntry.getTags()).containsOnly(tagBack);

        blogEntry.setTags(new HashSet<>());
        assertThat(blogEntry.getTags()).doesNotContain(tagBack);
    }
}
