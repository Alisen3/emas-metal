package com.emasmetal.backend.service;

import com.emasmetal.backend.dto.request.ReferenceRequest;
import com.emasmetal.backend.dto.response.ReferenceResponse;
import com.emasmetal.backend.entity.Reference;
import com.emasmetal.backend.exception.ResourceNotFoundException;
import com.emasmetal.backend.mapper.ReferenceMapper;
import com.emasmetal.backend.repository.ReferenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReferenceService {

    private final ReferenceRepository referenceRepository;
    private final ReferenceMapper referenceMapper;

    public List<ReferenceResponse> getAllReferences() {
        List<Reference> references = referenceRepository.findAll();
        return referenceMapper.toResponseList(references);
    }

    public ReferenceResponse getReferenceById(UUID id) {
        Reference reference = referenceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reference", "id", id));
        return referenceMapper.toResponse(reference);
    }

    @Transactional
    public ReferenceResponse createReference(ReferenceRequest request) {
        Reference reference = referenceMapper.toEntity(request);
        Reference savedReference = referenceRepository.save(reference);
        return referenceMapper.toResponse(savedReference);
    }

    @Transactional
    public ReferenceResponse updateReference(UUID id, ReferenceRequest request) {
        Reference reference = referenceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reference", "id", id));

        referenceMapper.updateEntity(request, reference);
        Reference updatedReference = referenceRepository.save(reference);
        return referenceMapper.toResponse(updatedReference);
    }

    @Transactional
    public void deleteReference(UUID id) {
        if (!referenceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Reference", "id", id);
        }
        referenceRepository.deleteById(id);
    }
}
