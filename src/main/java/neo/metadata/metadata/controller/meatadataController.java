package neo.metadata.metadata.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class meatadataController {

    @GetMapping("/")
    public String helloworld(){
        return "Use /metadata.json for getting the static file";
    }
}
