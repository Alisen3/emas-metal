package com.emasmetal.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GalleryItemResponse {

    private UUID id;
    private String title;
    private String imageUrl;
    private String category;
    private LocalDateTime createdAt;
}
