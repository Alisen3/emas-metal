package com.emasmetal.mapper;

import com.emasmetal.dto.ContactMessageDto;
import com.emasmetal.dto.GalleryItemDto;
import com.emasmetal.dto.ReferenceDto;
import com.emasmetal.entity.ContactMessage;
import com.emasmetal.entity.GalleryItem;
import com.emasmetal.entity.Reference;
import org.springframework.stereotype.Component;

@Component
public class DtoMapper {
    
    // Reference Mappings
    public ReferenceDto.Response toResponse(Reference entity) {
        if (entity == null) return null;
        
        return ReferenceDto.Response.builder()
                .id(entity.getId())
                .name(entity.getName())
                .websiteUrl(entity.getWebsiteUrl())
                .logoUrl(entity.getLogoUrl())
                .industry(entity.getIndustry())
                .description(entity.getDescription())
                .displayOrder(entity.getDisplayOrder())
                .createdAt(entity.getCreatedAt())
                .build();
    }
    
    public Reference toEntity(ReferenceDto.CreateRequest dto) {
        if (dto == null) return null;
        
        return Reference.builder()
                .name(dto.getName())
                .websiteUrl(dto.getWebsiteUrl())
                .industry(dto.getIndustry())
                .description(dto.getDescription())
                .displayOrder(dto.getDisplayOrder())
                .build();
    }
    
    public void updateEntity(Reference entity, ReferenceDto.UpdateRequest dto) {
        if (dto.getName() != null) entity.setName(dto.getName());
        if (dto.getWebsiteUrl() != null) entity.setWebsiteUrl(dto.getWebsiteUrl());
        if (dto.getIndustry() != null) entity.setIndustry(dto.getIndustry());
        if (dto.getDescription() != null) entity.setDescription(dto.getDescription());
        if (dto.getDisplayOrder() != null) entity.setDisplayOrder(dto.getDisplayOrder());
    }
    
    // GalleryItem Mappings
    public GalleryItemDto.Response toResponse(GalleryItem entity) {
        if (entity == null) return null;
        
        return GalleryItemDto.Response.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .imageUrl(entity.getImageUrl())
                .thumbnailUrl(entity.getThumbnailUrl())
                .category(entity.getCategory())
                .description(entity.getDescription())
                .displayOrder(entity.getDisplayOrder())
                .createdAt(entity.getCreatedAt())
                .build();
    }
    
    public GalleryItem toEntity(GalleryItemDto.CreateRequest dto) {
        if (dto == null) return null;
        
        return GalleryItem.builder()
                .title(dto.getTitle())
                .category(dto.getCategory())
                .description(dto.getDescription())
                .displayOrder(dto.getDisplayOrder())
                .build();
    }
    
    public void updateEntity(GalleryItem entity, GalleryItemDto.UpdateRequest dto) {
        if (dto.getTitle() != null) entity.setTitle(dto.getTitle());
        if (dto.getCategory() != null) entity.setCategory(dto.getCategory());
        if (dto.getDescription() != null) entity.setDescription(dto.getDescription());
        if (dto.getDisplayOrder() != null) entity.setDisplayOrder(dto.getDisplayOrder());
    }
    
    // ContactMessage Mappings
    public ContactMessageDto.Response toResponse(ContactMessage entity) {
        if (entity == null) return null;
        
        return ContactMessageDto.Response.builder()
                .id(entity.getId())
                .name(entity.getName())
                .company(entity.getCompany())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .message(entity.getMessage())
                .attachmentUrl(entity.getAttachmentUrl())
                .attachmentFilename(entity.getAttachmentFilename())
                .isRead(entity.getIsRead())
                .createdAt(entity.getCreatedAt())
                .build();
    }
    
    public ContactMessage toEntity(ContactMessageDto.CreateRequest dto) {
        if (dto == null) return null;
        
        return ContactMessage.builder()
                .name(dto.getName())
                .company(dto.getCompany())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .message(dto.getMessage())
                .build();
    }
}
