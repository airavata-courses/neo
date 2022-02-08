package neo.metadata.metadata.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(metadataController.class)

class MetadataControllerTest {

    @Autowired
    private MockMvc mvc;
    @Test
    void testwithroot() throws Exception {
        RequestBuilder request = get("/");
        MvcResult result = mvc.perform(request).andReturn();
        assertEquals("Use /metadata.json for getting the static file", result.getResponse().getContentAsString());

    }

    @Test
    public void testjson() throws Exception {
        mvc.perform(get("/metadata.json"))
                .andExpect(status().isOk());

    }
}