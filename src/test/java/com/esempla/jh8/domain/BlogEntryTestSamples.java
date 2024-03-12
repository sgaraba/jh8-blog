package com.esempla.jh8.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class BlogEntryTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static BlogEntry getBlogEntrySample1() {
        return new BlogEntry().id(1L).title("title1");
    }

    public static BlogEntry getBlogEntrySample2() {
        return new BlogEntry().id(2L).title("title2");
    }

    public static BlogEntry getBlogEntryRandomSampleGenerator() {
        return new BlogEntry().id(longCount.incrementAndGet()).title(UUID.randomUUID().toString());
    }
}
