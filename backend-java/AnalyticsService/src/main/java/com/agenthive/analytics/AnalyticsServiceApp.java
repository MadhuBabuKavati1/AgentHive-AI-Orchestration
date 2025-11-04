package com.agenthive.analytics;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@SpringBootApplication
@RestController
@RequestMapping("/analytics")
public class AnalyticsServiceApp {

    public static void main(String[] args) {
        SpringApplication.run(AnalyticsServiceApp.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "AnalyticsService is running 📊";
    }

    @PostMapping("/analyze")
    public Map<String, Object> analyze(@RequestBody Map<String, Object> data) {
        Map<String, Object> res = new HashMap<>();
        res.put("entries", data.size());
        res.put("timestamp", new Date());
        return res;
    }
}
