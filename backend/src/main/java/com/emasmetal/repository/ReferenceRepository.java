package com.emasmetal.repository;

import com.emasmetal.entity.Reference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReferenceRepository extends JpaRepository<Reference, UUID> {
    
    List<Reference> findAllByOrderByDisplayOrderAscCreatedAtDesc();
    
    List<Reference> findByIndustryOrderByDisplayOrderAsc(String industry);
}
