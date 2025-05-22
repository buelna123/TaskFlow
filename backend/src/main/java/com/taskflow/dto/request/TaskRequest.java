package com.taskflow.dto.request;

import lombok.Data;

@Data
public class TaskRequest {
    private String title;
    private String description;
}