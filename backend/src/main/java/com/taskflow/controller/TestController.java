package com.taskflow.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {
    
    @GetMapping("/status")
    public String appStatus() {
        return "Aplicación funcionando correctamente";
    }
    
    @GetMapping("/db")
    public String dbStatus() {
        return "Conexión a la base de datos funcionando";
    }
}