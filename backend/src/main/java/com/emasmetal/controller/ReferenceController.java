package com.emasmetal.controller;

import com.emasmetal.dto.ReferenceDto;
import com.emasmetal.service.ReferenceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
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
import java.util.UUID;

@RestController
@RequestMapping("/api/references")
@RequiredArgsConstructor
@Tag(name = "References", description = "Client references and partnerships")
public class ReferenceController {
    
    private final ReferenceService referenceService;
    
    @GetMapping
    @Operation(summary = "Get all references", description = "Retrieve all client references")
    @ApiResponse(responseCode = "200", description = "List of references")
    public ResponseEntity<List<ReferenceDto.Response>> getAllReferences(
            @RequestParam(required = false) String industry) {
        
        List<ReferenceDto.Response> references;
        if (industry != null && !industry.isBlank()) {
            references = referenceService.getReferencesByIndustry(industry);
        } else {
            references = referenceService.getAllReferences();
        }
        return ResponseEntity.ok(references);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get reference by ID", description = "Retrieve a specific reference")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reference found"),
            @ApiResponse(responseCode = "404", description = "Reference not found")
    })
    public ResponseEntity<ReferenceDto.Response> getReference(
            @PathVariable UUID id) {
        return ResponseEntity.ok(referenceService.getReference(id));
    }
    
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(
            summary = "Create a new reference", 
            description = "Create a new client reference (admin only)",
            security = @SecurityRequirement(name = "basicAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Reference created"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    public ResponseEntity<ReferenceDto.Response> createReference(
            @Valid @RequestPart("data") ReferenceDto.CreateRequest request,
            @Parameter(description = "Company logo image")
            @RequestPart(value = "logo", required = false) MultipartFile logo) {
        
        ReferenceDto.Response created = referenceService.createReference(request, logo);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(
            summary = "Update a reference", 
            description = "Update an existing reference (admin only)",
            security = @SecurityRequirement(name = "basicAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reference updated"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Reference not found")
    })
    public ResponseEntity<ReferenceDto.Response> updateReference(
            @PathVariable UUID id,
            @Valid @RequestPart("data") ReferenceDto.UpdateRequest request,
            @Parameter(description = "New company logo image")
            @RequestPart(value = "logo", required = false) MultipartFile logo) {
        
        return ResponseEntity.ok(referenceService.updateReference(id, request, logo));
    }
    
    @DeleteMapping("/{id}")
    @Operation(
            summary = "Delete a reference", 
            description = "Delete a reference (admin only)",
            security = @SecurityRequirement(name = "basicAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Reference deleted"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Reference not found")
    })
    public ResponseEntity<Void> deleteReference(@PathVariable UUID id) {
        referenceService.deleteReference(id);
        return ResponseEntity.noContent().build();
    }
}
