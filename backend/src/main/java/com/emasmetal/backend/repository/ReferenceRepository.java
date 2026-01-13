package com.emasmetal.backend.repository;

import com.emasmetal.backend.entity.Reference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ReferenceRepository extends JpaRepository<Reference, UUID> {
}
