package com.emasmetal.backend.controller;

import com.emasmetal.backend.dto.request.ContactMessageRequest;
import com.emasmetal.backend.dto.response.ContactMessageResponse;
import com.emasmetal.backend.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@Tag(name = "Contact", description = "Contact form API")
public class ContactController {

    private final ContactService contactService;

    @Operation(summary = "Submit contact message",
            description = "Submit a contact message with optional file attachment (Public)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Message submitted successfully",
                    content = @Content(schema = @Schema(implementation = ContactMessageResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input or file")
    })
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ContactMessageResponse> submitContactMessage(
            @RequestParam("name") String name,
            @RequestParam(value = "company", required = false) String company,
            @RequestParam("email") String email,
            @RequestParam("message") String message,
            @RequestParam(value = "attachment", required = false) MultipartFile attachment) {

        ContactMessageRequest request = ContactMessageRequest.builder()
                .name(name)
                .company(company)
                .email(email)
                .message(message)
                .build();

        ContactMessageResponse response = contactService.submitContactMessage(request, attachment);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
