package com.emasmetal.controller;

import com.emasmetal.dto.GalleryItemDto;
import com.emasmetal.service.GalleryService;
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
import java.util.UUID;

@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
@Tag(name = "Gallery", description = "Image gallery of work and facilities")
public class GalleryController {
    
    private final GalleryService galleryService;
    
    @GetMapping
    @Operation(summary = "Get all gallery items", description = "Retrieve all gallery images")
    @ApiResponse(responseCode = "200", description = "List of gallery items")
    public ResponseEntity<List<GalleryItemDto.Response>> getAllGalleryItems(
            @RequestParam(required = false) String category) {
        
        List<GalleryItemDto.Response> items;
        if (category != null && !category.isBlank()) {
            items = galleryService.getGalleryItemsByCategory(category);
        } else {
            items = galleryService.getAllGalleryItems();
        }
        return ResponseEntity.ok(items);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get gallery item by ID", description = "Retrieve a specific gallery item")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Gallery item found"),
            @ApiResponse(responseCode = "404", description = "Gallery item not found")
    })
    public ResponseEntity<GalleryItemDto.Response> getGalleryItem(
            @PathVariable UUID id) {
        return ResponseEntity.ok(galleryService.getGalleryItem(id));
    }
    
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(
            summary = "Upload a new gallery item", 
            description = "Upload a new gallery image (admin only)",
            security = @SecurityRequirement(name = "basicAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Gallery item created"),
            @ApiResponse(responseCode = "400", description = "Invalid input or missing image"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    public ResponseEntity<GalleryItemDto.Response> createGalleryItem(
            @Valid @RequestPart("data") GalleryItemDto.CreateRequest request,
            @Parameter(description = "Gallery image (required)")
            @RequestPart("image") MultipartFile image) {
        
        GalleryItemDto.Response created = galleryService.createGalleryItem(request, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(
            summary = "Update a gallery item", 
            description = "Update an existing gallery item (admin only)",
            security = @SecurityRequirement(name = "basicAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Gallery item updated"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Gallery item not found")
    })
    public ResponseEntity<GalleryItemDto.Response> updateGalleryItem(
            @PathVariable UUID id,
            @Valid @RequestPart("data") GalleryItemDto.UpdateRequest request,
            @Parameter(description = "New gallery image")
            @RequestPart(value = "image", required = false) MultipartFile image) {
        
        return ResponseEntity.ok(galleryService.updateGalleryItem(id, request, image));
    }
    
    @DeleteMapping("/{id}")
    @Operation(
            summary = "Delete a gallery item", 
            description = "Delete a gallery item (admin only)",
            security = @SecurityRequirement(name = "basicAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Gallery item deleted"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Gallery item not found")
    })
    public ResponseEntity<Void> deleteGalleryItem(@PathVariable UUID id) {
        galleryService.deleteGalleryItem(id);
        return ResponseEntity.noContent().build();
    }
}
