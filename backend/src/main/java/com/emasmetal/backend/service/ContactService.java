package com.emasmetal.backend.service;

import com.emasmetal.backend.dto.request.ContactMessageRequest;
import com.emasmetal.backend.dto.response.ContactMessageResponse;
import com.emasmetal.backend.entity.ContactMessage;
import com.emasmetal.backend.mapper.ContactMessageMapper;
import com.emasmetal.backend.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;
    private final ContactMessageMapper contactMessageMapper;
    private final FileStorageService fileStorageService;

    @Transactional
    public ContactMessageResponse submitContactMessage(ContactMessageRequest request, MultipartFile attachment) {
        ContactMessage message = contactMessageMapper.toEntity(request);

        if (attachment != null && !attachment.isEmpty()) {
            String attachmentUrl = fileStorageService.storeContactFile(attachment);
            message.setAttachmentUrl(attachmentUrl);
        }

        ContactMessage savedMessage = contactMessageRepository.save(message);
        return contactMessageMapper.toResponse(savedMessage);
    }
}
