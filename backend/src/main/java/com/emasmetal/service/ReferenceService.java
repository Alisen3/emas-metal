package com.emasmetal.service;

import com.emasmetal.dto.ReferenceDto;
import com.emasmetal.entity.Reference;
import com.emasmetal.exception.ResourceNotFoundException;
import com.emasmetal.mapper.DtoMapper;
import com.emasmetal.repository.ReferenceRepository;
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
public class ReferenceService {
    
    private final ReferenceRepository referenceRepository;
    private final FileStorageService fileStorageService;
    private final DtoMapper dtoMapper;
    
    @Transactional(readOnly = true)
    public List<ReferenceDto.Response> getAllReferences() {
        return referenceRepository.findAllByOrderByDisplayOrderAscCreatedAtDesc()
                .stream()
                .map(dtoMapper::toResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<ReferenceDto.Response> getReferencesByIndustry(String industry) {
        return referenceRepository.findByIndustryOrderByDisplayOrderAsc(industry)
                .stream()
                .map(dtoMapper::toResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public ReferenceDto.Response getReference(UUID id) {
        Reference reference = referenceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reference not found with id: " + id));
        return dtoMapper.toResponse(reference);
    }
    
    public ReferenceDto.Response createReference(ReferenceDto.CreateRequest request, MultipartFile logo) {
        Reference reference = dtoMapper.toEntity(request);
        
        if (logo != null && !logo.isEmpty()) {
            String logoUrl = fileStorageService.storeFile(logo, "logos");
            reference.setLogoUrl(logoUrl);
        }
        
        Reference saved = referenceRepository.save(reference);
        log.info("Created reference: {} ({})", saved.getName(), saved.getId());
        
        return dtoMapper.toResponse(saved);
    }
    
    public ReferenceDto.Response updateReference(UUID id, ReferenceDto.UpdateRequest request, MultipartFile logo) {
        Reference reference = referenceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reference not found with id: " + id));
        
        dtoMapper.updateEntity(reference, request);
        
        if (logo != null && !logo.isEmpty()) {
            // Delete old logo if exists
            if (reference.getLogoUrl() != null) {
                fileStorageService.deleteFile(reference.getLogoUrl());
            }
            String logoUrl = fileStorageService.storeFile(logo, "logos");
            reference.setLogoUrl(logoUrl);
        }
        
        Reference saved = referenceRepository.save(reference);
        log.info("Updated reference: {} ({})", saved.getName(), saved.getId());
        
        return dtoMapper.toResponse(saved);
    }
    
    public void deleteReference(UUID id) {
        Reference reference = referenceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reference not found with id: " + id));
        
        // Delete logo file if exists
        if (reference.getLogoUrl() != null) {
            fileStorageService.deleteFile(reference.getLogoUrl());
        }
        
        referenceRepository.delete(reference);
        log.info("Deleted reference: {} ({})", reference.getName(), reference.getId());
    }
}
