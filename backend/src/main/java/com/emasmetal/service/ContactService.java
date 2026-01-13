package com.emasmetal.service;

import com.emasmetal.dto.ContactMessageDto;
import com.emasmetal.entity.ContactMessage;
import com.emasmetal.exception.ResourceNotFoundException;
import com.emasmetal.mapper.DtoMapper;
import com.emasmetal.repository.ContactMessageRepository;
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
public class ContactService {
    
    private final ContactMessageRepository contactMessageRepository;
    private final FileStorageService fileStorageService;
    private final DtoMapper dtoMapper;
    
    public ContactMessageDto.PublicResponse submitContactMessage(
            ContactMessageDto.CreateRequest request, 
            MultipartFile attachment) {
        
        ContactMessage message = dtoMapper.toEntity(request);
        
        if (attachment != null && !attachment.isEmpty()) {
            String attachmentUrl = fileStorageService.storeFile(attachment, "attachments");
            message.setAttachmentUrl(attachmentUrl);
            message.setAttachmentFilename(attachment.getOriginalFilename());
        }
        
        ContactMessage saved = contactMessageRepository.save(message);
        log.info("Received contact message from: {} <{}> ({})", 
                saved.getName(), saved.getEmail(), saved.getId());
        
        return ContactMessageDto.PublicResponse.builder()
                .success(true)
                .message("Thank you for your message. We will get back to you within 24 hours.")
                .referenceId(saved.getId())
                .build();
    }
    
    @Transactional(readOnly = true)
    public List<ContactMessageDto.Response> getAllMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(dtoMapper::toResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<ContactMessageDto.Response> getUnreadMessages() {
        return contactMessageRepository.findByIsReadFalseOrderByCreatedAtDesc()
                .stream()
                .map(dtoMapper::toResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public ContactMessageDto.Response getMessage(UUID id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with id: " + id));
        return dtoMapper.toResponse(message);
    }
    
    public void markAsRead(UUID id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with id: " + id));
        message.setIsRead(true);
        contactMessageRepository.save(message);
        log.info("Marked message as read: {}", id);
    }
    
    public void deleteMessage(UUID id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with id: " + id));
        
        // Delete attachment if exists
        if (message.getAttachmentUrl() != null) {
            fileStorageService.deleteFile(message.getAttachmentUrl());
        }
        
        contactMessageRepository.delete(message);
        log.info("Deleted message: {}", id);
    }
    
    @Transactional(readOnly = true)
    public long getUnreadCount() {
        return contactMessageRepository.countByIsReadFalse();
    }
}
