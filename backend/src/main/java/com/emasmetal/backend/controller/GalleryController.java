package com.emasmetal.backend.controller;

import com.emasmetal.backend.dto.request.GalleryItemRequest;
import com.emasmetal.backend.dto.response.GalleryItemResponse;
import com.emasmetal.backend.dto.response.MessageResponse;
import com.emasmetal.backend.service.GalleryService;
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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
@Tag(name = "Gallery", description = "Gallery management APIs")
public class GalleryController {

    private final GalleryService galleryService;

    @Operation(summary = "Get all gallery items", description = "Retrieve all gallery items (Public)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved gallery items",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = GalleryItemResponse.class))))
    })
    @GetMapping
    public ResponseEntity<List<GalleryItemResponse>> getAllGalleryItems(
            @RequestParam(required = false) String category) {
        List<GalleryItemResponse> items;
        if (category != null && !category.isEmpty()) {
            items = galleryService.getGalleryItemsByCategory(category);
        } else {
            items = galleryService.getAllGalleryItems();
        }
        return ResponseEntity.ok(items);
    }

    @Operation(summary = "Get gallery item by ID", description = "Retrieve a specific gallery item by ID (Public)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved gallery item",
                    content = @Content(schema = @Schema(implementation = GalleryItemResponse.class))),
            @ApiResponse(responseCode = "404", description = "Gallery item not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<GalleryItemResponse> getGalleryItemById(@PathVariable UUID id) {
        GalleryItemResponse item = galleryService.getGalleryItemById(id);
        return ResponseEntity.ok(item);
    }

    @Operation(summary = "Create gallery item", description = "Create a new gallery item with image upload (Admin only)")
    @SecurityRequirement(name = "bearerAuth")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Gallery item created successfully",
                    content = @Content(schema = @Schema(implementation = GalleryItemResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input or file"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GalleryItemResponse> createGalleryItem(
            @RequestParam("title") String title,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam("image") MultipartFile image) {

        GalleryItemRequest request = GalleryItemRequest.builder()
                .title(title)
                .category(category)
                .build();

        GalleryItemResponse item = galleryService.createGalleryItem(request, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(item);
    }

    @Operation(summary = "Update gallery item", description = "Update an existing gallery item (Admin only)")
    @SecurityRequirement(name = "bearerAuth")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Gallery item updated successfully",
                    content = @Content(schema = @Schema(implementation = GalleryItemResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Gallery item not found")
    })
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GalleryItemResponse> updateGalleryItem(
            @PathVariable UUID id,
            @RequestParam("title") String title,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        GalleryItemRequest request = GalleryItemRequest.builder()
                .title(title)
                .category(category)
                .build();

        GalleryItemResponse item = galleryService.updateGalleryItem(id, request, image);
        return ResponseEntity.ok(item);
    }

    @Operation(summary = "Delete gallery item", description = "Delete a gallery item (Admin only)")
    @SecurityRequirement(name = "bearerAuth")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Gallery item deleted successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Gallery item not found")
    })
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> deleteGalleryItem(@PathVariable UUID id) {
        galleryService.deleteGalleryItem(id);
        return ResponseEntity.ok(MessageResponse.success("Gallery item deleted successfully"));
    }
}
