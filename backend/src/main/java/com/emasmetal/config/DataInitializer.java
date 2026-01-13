package com.emasmetal.config;

import com.emasmetal.entity.GalleryItem;
import com.emasmetal.entity.Reference;
import com.emasmetal.repository.GalleryItemRepository;
import com.emasmetal.repository.ReferenceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {
    
    @Bean
    @Profile("dev")
    public CommandLineRunner initData(
            ReferenceRepository referenceRepository,
            GalleryItemRepository galleryItemRepository) {
        
        return args -> {
            if (referenceRepository.count() == 0) {
                log.info("Initializing sample references...");
                
                referenceRepository.save(Reference.builder()
                        .name("Siemens Energy")
                        .websiteUrl("https://www.siemens-energy.com")
                        .industry("Energy & Power")
                        .description("Precision turbine components for power generation systems")
                        .displayOrder(1)
                        .build());
                
                referenceRepository.save(Reference.builder()
                        .name("Bosch Rexroth")
                        .websiteUrl("https://www.boschrexroth.com")
                        .industry("Industrial Automation")
                        .description("Hydraulic system components and precision machined parts")
                        .displayOrder(2)
                        .build());
                
                referenceRepository.save(Reference.builder()
                        .name("MAN Truck & Bus")
                        .websiteUrl("https://www.man.eu")
                        .industry("Automotive")
                        .description("Heavy-duty engine components and transmission parts")
                        .displayOrder(3)
                        .build());
                
                referenceRepository.save(Reference.builder()
                        .name("ThyssenKrupp")
                        .websiteUrl("https://www.thyssenkrupp.com")
                        .industry("Steel & Materials")
                        .description("Precision machining for steel processing equipment")
                        .displayOrder(4)
                        .build());
                
                referenceRepository.save(Reference.builder()
                        .name("ABB Ltd")
                        .websiteUrl("https://www.abb.com")
                        .industry("Electrical Equipment")
                        .description("Motor housings and electrical enclosure components")
                        .displayOrder(5)
                        .build());
                
                referenceRepository.save(Reference.builder()
                        .name("KUKA Robotics")
                        .websiteUrl("https://www.kuka.com")
                        .industry("Robotics")
                        .description("Robotic arm joints and precision mounting components")
                        .displayOrder(6)
                        .build());
                
                log.info("Sample references created");
            }
            
            if (galleryItemRepository.count() == 0) {
                log.info("Initializing sample gallery items...");
                
                galleryItemRepository.save(GalleryItem.builder()
                        .title("5-Axis CNC Milling Center")
                        .imageUrl("/uploads/gallery/sample-milling-1.jpg")
                        .category("Milling")
                        .description("Our DMG MORI DMU 80 eVo 5-axis machining center")
                        .displayOrder(1)
                        .build());
                
                galleryItemRepository.save(GalleryItem.builder()
                        .title("Precision CNC Turning")
                        .imageUrl("/uploads/gallery/sample-turning-1.jpg")
                        .category("Turning")
                        .description("High-precision turning operation on aerospace component")
                        .displayOrder(2)
                        .build());
                
                galleryItemRepository.save(GalleryItem.builder()
                        .title("Complex Machined Part")
                        .imageUrl("/uploads/gallery/sample-part-1.jpg")
                        .category("Parts")
                        .description("Multi-axis machined titanium component for aerospace application")
                        .displayOrder(3)
                        .build());
                
                galleryItemRepository.save(GalleryItem.builder()
                        .title("Factory Floor Overview")
                        .imageUrl("/uploads/gallery/sample-factory-1.jpg")
                        .category("Factory")
                        .description("Our modern 2,500m² production facility")
                        .displayOrder(4)
                        .build());
                
                log.info("Sample gallery items created");
            }
        };
    }
}
