package com.emasmetal.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

public class GalleryItemDto {
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private UUID id;
        private String title;
        private String imageUrl;
        private String thumbnailUrl;
        private String category;
        private String description;
        private Integer displayOrder;
        private LocalDateTime createdAt;
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateRequest {
        @NotBlank(message = "Title is required")
        @Size(max = 255, message = "Title must be less than 255 characters")
        private String title;
        
        @Size(max = 50, message = "Category must be less than 50 characters")
        private String category; // "Milling", "Turning", "Parts", "Factory"
        
        @Size(max = 500, message = "Description must be less than 500 characters")
        private String description;
        
        private Integer displayOrder;
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateRequest {
        @Size(max = 255, message = "Title must be less than 255 characters")
        private String title;
        
        @Size(max = 50, message = "Category must be less than 50 characters")
        private String category;
        
        @Size(max = 500, message = "Description must be less than 500 characters")
        private String description;
        
        private Integer displayOrder;
    }
}
