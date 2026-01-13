package com.emasmetal.backend.mapper;

import com.emasmetal.backend.dto.request.ContactMessageRequest;
import com.emasmetal.backend.dto.response.ContactMessageResponse;
import com.emasmetal.backend.entity.ContactMessage;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ContactMessageMapper {

    ContactMessage toEntity(ContactMessageRequest request);

    ContactMessageResponse toResponse(ContactMessage entity);

    List<ContactMessageResponse> toResponseList(List<ContactMessage> entities);
}
