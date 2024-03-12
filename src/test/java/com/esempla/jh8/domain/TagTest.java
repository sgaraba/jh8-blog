package com.esempla.jh8.domain;

import static com.esempla.jh8.domain.BlogEntryTestSamples.*;
import static com.esempla.jh8.domain.TagTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.esempla.jh8.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class TagTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tag.class);
        Tag tag1 = getTagSample1();
        Tag tag2 = new Tag();
        assertThat(tag1).isNotEqualTo(tag2);

        tag2.setId(tag1.getId());
        assertThat(tag1).isEqualTo(tag2);

        tag2 = getTagSample2();
        assertThat(tag1).isNotEqualTo(tag2);
    }

    @Test
    void entryTest() throws Exception {
        Tag tag = getTagRandomSampleGenerator();
        BlogEntry blogEntryBack = getBlogEntryRandomSampleGenerator();

        tag.addEntry(blogEntryBack);
        assertThat(tag.getEntries()).containsOnly(blogEntryBack);
        assertThat(blogEntryBack.getTags()).containsOnly(tag);

        tag.removeEntry(blogEntryBack);
        assertThat(tag.getEntries()).doesNotContain(blogEntryBack);
        assertThat(blogEntryBack.getTags()).doesNotContain(tag);

        tag.entries(new HashSet<>(Set.of(blogEntryBack)));
        assertThat(tag.getEntries()).containsOnly(blogEntryBack);
        assertThat(blogEntryBack.getTags()).containsOnly(tag);

        tag.setEntries(new HashSet<>());
        assertThat(tag.getEntries()).doesNotContain(blogEntryBack);
        assertThat(blogEntryBack.getTags()).doesNotContain(tag);
    }
}
