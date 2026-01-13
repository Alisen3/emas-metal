package com.emasmetal.controller;

import com.emasmetal.dto.ContactMessageDto;
import com.emasmetal.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@Tag(name = "Contact", description = "Contact form and message management")
public class ContactController {
    
    private final ContactService contactService;
    
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(
            summary = "Submit a contact message", 
            description = "Submit a new contact inquiry with optional file attachment"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Message submitted successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input or file type")
    })
    public ResponseEntity<ContactMessageDto.PublicResponse> submitContactMessage(
            @Valid @RequestPart("data") ContactMessageDto.CreateRequest request,
            @Parameter(description = "Technical drawing attachment (PDF, DWG, DXF, STEP, PNG, JPG)")
            @RequestPart(value = "attachment", required = false) MultipartFile attachment) {
        
        ContactMessageDto.PublicResponse response = contactService.submitContactMessage(request, attachment);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    // Admin-only endpoints below
    
    @GetMapping("/messages")
    @Operation(
            summary = "Get all contact messages", 
            description = "Retrieve all contact messages (admin only)",
            security = @SecurityRequirement(name = "basicAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of messages"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    public ResponseEntity<List<ContactMessageDto.Response>> getAllMessages(
            @RequestParam(required = false, defaultValue = "false") boolean unreadOnly) {
        
        List<ContactMessageDto.Response> messages;
        if (unreadOnly) {
            messages = contactService.getUnreadMessages();
        } else {
            messages = contactService.getAllMessages();
        }
        return ResponseEntity.ok(messages);
    }
    
    @GetMapping("/messages/{id}")
    @Operation(
            summary = "Get a specific message", 
            description = "Retrieve a specific contact message (admin only)",
            security = @SecurityRequirement(name = "basicAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Message found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Message not found")
    })
    public ResponseEntity<ContactMessageDto.Response> getMessage(@PathVariable UUID id) {
        return ResponseEntity.ok(contactService.getMessage(id));
    }
    
    @PatchMapping("/messages/{id}/read")
    @Operation(
            summary = "Mark message as read", 
            description = "Mark a message as read (admin only)",
            security = @SecurityRequirement(name = "basicAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Message marked as read"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Message not found")
    })
    public ResponseEntity<Void> markAsRead(@PathVariable UUID id) {
        contactService.markAsRead(id);
        return ResponseEntity.noContent().build();
    }
    
    @DeleteMapping("/messages/{id}")
    @Operation(
            summary = "Delete a message", 
            description = "Delete a contact message (admin only)",
            security = @SecurityRequirement(name = "basicAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Message deleted"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Message not found")
    })
    public ResponseEntity<Void> deleteMessage(@PathVariable UUID id) {
        contactService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/messages/unread-count")
    @Operation(
            summary = "Get unread message count", 
            description = "Get count of unread messages (admin only)",
            security = @SecurityRequirement(name = "basicAuth")
    )
    public ResponseEntity<Map<String, Long>> getUnreadCount() {
        return ResponseEntity.ok(Map.of("unreadCount", contactService.getUnreadCount()));
    }
}
