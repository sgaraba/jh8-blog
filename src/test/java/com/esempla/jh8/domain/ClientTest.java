package com.esempla.jh8.domain;

import static com.esempla.jh8.domain.ClientTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.esempla.jh8.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ClientTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Client.class);
        Client client1 = getClientSample1();
        Client client2 = new Client();
        assertThat(client1).isNotEqualTo(client2);

        client2.setId(client1.getId());
        assertThat(client1).isEqualTo(client2);

        client2 = getClientSample2();
        assertThat(client1).isNotEqualTo(client2);
    }
}
