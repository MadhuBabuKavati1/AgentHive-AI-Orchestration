package com.agenthive.workflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@SpringBootApplication
@RestController
@RequestMapping("/workflow")
public class WorkflowServiceApp {

    private final List<Map<String, String>> workflows = new ArrayList<>();

    public static void main(String[] args) {
        SpringApplication.run(WorkflowServiceApp.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "WorkflowService is running 🚀";
    }

    @PostMapping("/create")
    public Map<String, String> createWorkflow(@RequestBody Map<String, String> req) {
        req.put("status", "Created");
        workflows.add(req);
        return req;
    }

    @GetMapping("/list")
    public List<Map<String, String>> listWorkflows() {
        return workflows;
    }
}
