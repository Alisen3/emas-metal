package com.emasmetal.backend.controller;

import com.emasmetal.backend.dto.request.ReferenceRequest;
import com.emasmetal.backend.dto.response.MessageResponse;
import com.emasmetal.backend.dto.response.ReferenceResponse;
import com.emasmetal.backend.service.ReferenceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/references")
@RequiredArgsConstructor
@Tag(name = "References", description = "Reference management APIs (companies EMAS Metal worked with)")
public class ReferenceController {

    private final ReferenceService referenceService;

    @Operation(summary = "Get all references", description = "Retrieve all company references (Public)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved references",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = ReferenceResponse.class))))
    })
    @GetMapping
    public ResponseEntity<List<ReferenceResponse>> getAllReferences() {
        List<ReferenceResponse> references = referenceService.getAllReferences();
        return ResponseEntity.ok(references);
    }

    @Operation(summary = "Get reference by ID", description = "Retrieve a specific reference by ID (Public)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved reference",
                    content = @Content(schema = @Schema(implementation = ReferenceResponse.class))),
            @ApiResponse(responseCode = "404", description = "Reference not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ReferenceResponse> getReferenceById(@PathVariable UUID id) {
        ReferenceResponse reference = referenceService.getReferenceById(id);
        return ResponseEntity.ok(reference);
    }

    @Operation(summary = "Create reference", description = "Create a new company reference (Admin only)")
    @SecurityRequirement(name = "bearerAuth")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Reference created successfully",
                    content = @Content(schema = @Schema(implementation = ReferenceResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReferenceResponse> createReference(@Valid @RequestBody ReferenceRequest request) {
        ReferenceResponse reference = referenceService.createReference(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(reference);
    }

    @Operation(summary = "Update reference", description = "Update an existing reference (Admin only)")
    @SecurityRequirement(name = "bearerAuth")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reference updated successfully",
                    content = @Content(schema = @Schema(implementation = ReferenceResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Reference not found")
    })
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReferenceResponse> updateReference(
            @PathVariable UUID id,
            @Valid @RequestBody ReferenceRequest request) {
        ReferenceResponse reference = referenceService.updateReference(id, request);
        return ResponseEntity.ok(reference);
    }

    @Operation(summary = "Delete reference", description = "Delete a reference (Admin only)")
    @SecurityRequirement(name = "bearerAuth")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reference deleted successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Reference not found")
    })
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> deleteReference(@PathVariable UUID id) {
        referenceService.deleteReference(id);
        return ResponseEntity.ok(MessageResponse.success("Reference deleted successfully"));
    }
}
