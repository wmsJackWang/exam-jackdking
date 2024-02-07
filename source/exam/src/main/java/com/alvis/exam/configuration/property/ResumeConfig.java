package com.alvis.exam.configuration.property;

import lombok.Data;

import java.time.Duration;
import java.util.List;

@Data
public class ResumeConfig {
    private Duration tokenToLive;
    private List<String> securityIgnoreUrls;
}
