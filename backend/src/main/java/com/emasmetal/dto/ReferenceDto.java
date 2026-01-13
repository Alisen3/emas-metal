package com.emasmetal.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

public class ReferenceDto {
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private UUID id;
        private String name;
        private String websiteUrl;
        private String logoUrl;
        private String industry;
        private String description;
        private Integer displayOrder;
        private LocalDateTime createdAt;
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateRequest {
        @NotBlank(message = "Name is required")
        @Size(max = 255, message = "Name must be less than 255 characters")
        private String name;
        
        @Size(max = 500, message = "Website URL must be less than 500 characters")
        private String websiteUrl;
        
        @Size(max = 100, message = "Industry must be less than 100 characters")
        private String industry;
        
        @Size(max = 500, message = "Description must be less than 500 characters")
        private String description;
        
        private Integer displayOrder;
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateRequest {
        @Size(max = 255, message = "Name must be less than 255 characters")
        private String name;
        
        @Size(max = 500, message = "Website URL must be less than 500 characters")
        private String websiteUrl;
        
        @Size(max = 100, message = "Industry must be less than 100 characters")
        private String industry;
        
        @Size(max = 500, message = "Description must be less than 500 characters")
        private String description;
        
        private Integer displayOrder;
    }
}
