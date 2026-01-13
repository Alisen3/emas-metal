package com.emasmetal.service;

import com.emasmetal.dto.GalleryItemDto;
import com.emasmetal.entity.GalleryItem;
import com.emasmetal.exception.ResourceNotFoundException;
import com.emasmetal.mapper.DtoMapper;
import com.emasmetal.repository.GalleryItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class GalleryService {
    
    private final GalleryItemRepository galleryItemRepository;
    private final FileStorageService fileStorageService;
    private final DtoMapper dtoMapper;
    
    @Transactional(readOnly = true)
    public List<GalleryItemDto.Response> getAllGalleryItems() {
        return galleryItemRepository.findAllByOrderByDisplayOrderAscCreatedAtDesc()
                .stream()
                .map(dtoMapper::toResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<GalleryItemDto.Response> getGalleryItemsByCategory(String category) {
        return galleryItemRepository.findByCategoryOrderByDisplayOrderAsc(category)
                .stream()
                .map(dtoMapper::toResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public GalleryItemDto.Response getGalleryItem(UUID id) {
        GalleryItem item = galleryItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery item not found with id: " + id));
        return dtoMapper.toResponse(item);
    }
    
    public GalleryItemDto.Response createGalleryItem(GalleryItemDto.CreateRequest request, MultipartFile image) {
        if (image == null || image.isEmpty()) {
            throw new IllegalArgumentException("Image is required for gallery item");
        }
        
        GalleryItem item = dtoMapper.toEntity(request);
        
        String imageUrl = fileStorageService.storeFile(image, "gallery");
        item.setImageUrl(imageUrl);
        
        // TODO: Generate thumbnail (could use a library like Thumbnailator)
        item.setThumbnailUrl(imageUrl);
        
        GalleryItem saved = galleryItemRepository.save(item);
        log.info("Created gallery item: {} ({})", saved.getTitle(), saved.getId());
        
        return dtoMapper.toResponse(saved);
    }
    
    public GalleryItemDto.Response updateGalleryItem(UUID id, GalleryItemDto.UpdateRequest request, MultipartFile image) {
        GalleryItem item = galleryItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery item not found with id: " + id));
        
        dtoMapper.updateEntity(item, request);
        
        if (image != null && !image.isEmpty()) {
            // Delete old image if exists
            if (item.getImageUrl() != null) {
                fileStorageService.deleteFile(item.getImageUrl());
            }
            String imageUrl = fileStorageService.storeFile(image, "gallery");
            item.setImageUrl(imageUrl);
            item.setThumbnailUrl(imageUrl);
        }
        
        GalleryItem saved = galleryItemRepository.save(item);
        log.info("Updated gallery item: {} ({})", saved.getTitle(), saved.getId());
        
        return dtoMapper.toResponse(saved);
    }
    
    public void deleteGalleryItem(UUID id) {
        GalleryItem item = galleryItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery item not found with id: " + id));
        
        // Delete image files
        if (item.getImageUrl() != null) {
            fileStorageService.deleteFile(item.getImageUrl());
        }
        if (item.getThumbnailUrl() != null && !item.getThumbnailUrl().equals(item.getImageUrl())) {
            fileStorageService.deleteFile(item.getThumbnailUrl());
        }
        
        galleryItemRepository.delete(item);
        log.info("Deleted gallery item: {} ({})", item.getTitle(), item.getId());
    }
}
