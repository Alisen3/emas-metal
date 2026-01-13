package com.emasmetal.backend.mapper;

import com.emasmetal.backend.dto.request.GalleryItemRequest;
import com.emasmetal.backend.dto.response.GalleryItemResponse;
import com.emasmetal.backend.entity.GalleryItem;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GalleryItemMapper {

    GalleryItem toEntity(GalleryItemRequest request);

    GalleryItemResponse toResponse(GalleryItem entity);

    List<GalleryItemResponse> toResponseList(List<GalleryItem> entities);

    void updateEntity(GalleryItemRequest request, @MappingTarget GalleryItem entity);
}
