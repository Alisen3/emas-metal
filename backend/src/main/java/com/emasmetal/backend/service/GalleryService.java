package com.emasmetal.backend.service;

import com.emasmetal.backend.dto.request.GalleryItemRequest;
import com.emasmetal.backend.dto.response.GalleryItemResponse;
import com.emasmetal.backend.entity.GalleryItem;
import com.emasmetal.backend.exception.ResourceNotFoundException;
import com.emasmetal.backend.mapper.GalleryItemMapper;
import com.emasmetal.backend.repository.GalleryItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GalleryService {

    private final GalleryItemRepository galleryItemRepository;
    private final GalleryItemMapper galleryItemMapper;
    private final FileStorageService fileStorageService;

    public List<GalleryItemResponse> getAllGalleryItems() {
        List<GalleryItem> items = galleryItemRepository.findAllByOrderByCreatedAtDesc();
        return galleryItemMapper.toResponseList(items);
    }

    public List<GalleryItemResponse> getGalleryItemsByCategory(String category) {
        List<GalleryItem> items = galleryItemRepository.findByCategory(category);
        return galleryItemMapper.toResponseList(items);
    }

    public GalleryItemResponse getGalleryItemById(UUID id) {
        GalleryItem item = galleryItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("GalleryItem", "id", id));
        return galleryItemMapper.toResponse(item);
    }

    @Transactional
    public GalleryItemResponse createGalleryItem(GalleryItemRequest request, MultipartFile image) {
        String imageUrl = fileStorageService.storeGalleryFile(image);

        GalleryItem item = galleryItemMapper.toEntity(request);
        item.setImageUrl(imageUrl);

        GalleryItem savedItem = galleryItemRepository.save(item);
        return galleryItemMapper.toResponse(savedItem);
    }

    @Transactional
    public GalleryItemResponse updateGalleryItem(UUID id, GalleryItemRequest request, MultipartFile image) {
        GalleryItem item = galleryItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("GalleryItem", "id", id));

        galleryItemMapper.updateEntity(request, item);

        if (image != null && !image.isEmpty()) {
            // Delete old image
            fileStorageService.deleteFile(item.getImageUrl());
            // Store new image
            String newImageUrl = fileStorageService.storeGalleryFile(image);
            item.setImageUrl(newImageUrl);
        }

        GalleryItem updatedItem = galleryItemRepository.save(item);
        return galleryItemMapper.toResponse(updatedItem);
    }

    @Transactional
    public void deleteGalleryItem(UUID id) {
        GalleryItem item = galleryItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("GalleryItem", "id", id));

        // Delete the associated image file
        fileStorageService.deleteFile(item.getImageUrl());

        galleryItemRepository.delete(item);
    }
}
