package com.emasmetal.backend.mapper;

import com.emasmetal.backend.dto.request.ReferenceRequest;
import com.emasmetal.backend.dto.response.ReferenceResponse;
import com.emasmetal.backend.entity.Reference;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReferenceMapper {

    Reference toEntity(ReferenceRequest request);

    ReferenceResponse toResponse(Reference entity);

    List<ReferenceResponse> toResponseList(List<Reference> entities);

    void updateEntity(ReferenceRequest request, @MappingTarget Reference entity);
}
