package com.emasmetal.repository;

import com.emasmetal.entity.GalleryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface GalleryItemRepository extends JpaRepository<GalleryItem, UUID> {
    
    List<GalleryItem> findAllByOrderByDisplayOrderAscCreatedAtDesc();
    
    List<GalleryItem> findByCategoryOrderByDisplayOrderAsc(String category);
    
    List<GalleryItem> findByCategoryInOrderByDisplayOrderAsc(List<String> categories);
}
