package com.agenthive.data;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@SpringBootApplication
@RestController
@RequestMapping("/data")
public class DataServiceApp {

    private final List<String> dataStore = new ArrayList<>();

    public static void main(String[] args) {
        SpringApplication.run(DataServiceApp.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "DataService is running 📦";
    }

    @PostMapping("/store")
    public String storeData(@RequestBody String data) {
        dataStore.add(data);
        return "Data stored successfully";
    }

    @GetMapping("/fetch")
    public List<String> fetchData() {
        return dataStore;
    }
}
