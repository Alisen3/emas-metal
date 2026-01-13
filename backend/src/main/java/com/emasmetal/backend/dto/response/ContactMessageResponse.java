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
public class ContactMessageResponse {

    private UUID id;
    private String name;
    private String company;
    private String email;
    private String message;
    private String attachmentUrl;
    private LocalDateTime createdAt;
}
