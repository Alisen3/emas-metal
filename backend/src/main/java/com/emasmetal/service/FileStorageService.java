package com.emasmetal.service;

import com.emasmetal.exception.FileStorageException;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class FileStorageService {
    
    @Value("${file.upload-dir}")
    private String uploadDir;
    
    @Value("${file.allowed-extensions}")
    private String allowedExtensionsStr;
    
    @Value("${file.max-size-mb}")
    private int maxSizeMb;
    
    private Path uploadPath;
    private List<String> allowedExtensions;
    
    @PostConstruct
    public void init() {
        this.uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        this.allowedExtensions = Arrays.asList(allowedExtensionsStr.toLowerCase().split(","));
        
        try {
            Files.createDirectories(uploadPath);
            Files.createDirectories(uploadPath.resolve("gallery"));
            Files.createDirectories(uploadPath.resolve("logos"));
            Files.createDirectories(uploadPath.resolve("attachments"));
            log.info("Created upload directories at: {}", uploadPath);
        } catch (IOException e) {
            throw new FileStorageException("Could not create upload directories", e);
        }
    }
    
    public String storeFile(MultipartFile file, String subDirectory) {
        validateFile(file);
        
        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
        String extension = getFileExtension(originalFilename);
        String uniqueFilename = UUID.randomUUID().toString() + "." + extension;
        
        try {
            // Security check: prevent path traversal
            if (originalFilename.contains("..")) {
                throw new FileStorageException("Filename contains invalid path sequence: " + originalFilename);
            }
            
            Path targetDir = uploadPath.resolve(subDirectory);
            Files.createDirectories(targetDir);
            
            Path targetLocation = targetDir.resolve(uniqueFilename);
            
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, targetLocation, StandardCopyOption.REPLACE_EXISTING);
            }
            
            log.info("Stored file: {} -> {}", originalFilename, targetLocation);
            
            // Return relative path for URL generation
            return "/uploads/" + subDirectory + "/" + uniqueFilename;
            
        } catch (IOException e) {
            throw new FileStorageException("Could not store file " + originalFilename, e);
        }
    }
    
    public void deleteFile(String filePath) {
        if (filePath == null || filePath.isBlank()) {
            return;
        }
        
        try {
            // Convert URL path to file path
            String relativePath = filePath.replace("/uploads/", "");
            Path targetLocation = uploadPath.resolve(relativePath);
            
            if (Files.exists(targetLocation)) {
                Files.delete(targetLocation);
                log.info("Deleted file: {}", targetLocation);
            }
        } catch (IOException e) {
            log.error("Could not delete file: {}", filePath, e);
        }
    }
    
    public Path getFilePath(String relativePath) {
        String cleanPath = relativePath.replace("/uploads/", "");
        return uploadPath.resolve(cleanPath);
    }
    
    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new FileStorageException("Cannot store empty file");
        }
        
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isBlank()) {
            throw new FileStorageException("File must have a name");
        }
        
        String extension = getFileExtension(originalFilename).toLowerCase();
        if (!allowedExtensions.contains(extension)) {
            throw new FileStorageException(
                    "File type not allowed. Allowed types: " + String.join(", ", allowedExtensions));
        }
        
        long maxBytes = (long) maxSizeMb * 1024 * 1024;
        if (file.getSize() > maxBytes) {
            throw new FileStorageException("File size exceeds maximum allowed size of " + maxSizeMb + "MB");
        }
        
        // Validate MIME type
        String contentType = file.getContentType();
        if (contentType != null) {
            validateMimeType(contentType, extension);
        }
    }
    
    private void validateMimeType(String contentType, String extension) {
        // Basic MIME type validation
        boolean valid = switch (extension.toLowerCase()) {
            case "pdf" -> contentType.equals("application/pdf");
            case "png" -> contentType.equals("image/png");
            case "jpg", "jpeg" -> contentType.equals("image/jpeg");
            case "dwg" -> contentType.contains("dwg") || contentType.equals("application/octet-stream");
            case "dxf" -> contentType.contains("dxf") || contentType.equals("application/octet-stream");
            case "step", "stp" -> contentType.contains("step") || contentType.equals("application/octet-stream");
            default -> true;
        };
        
        if (!valid) {
            log.warn("MIME type mismatch: {} for extension {}", contentType, extension);
            // We still allow it but log for monitoring
        }
    }
    
    private String getFileExtension(String filename) {
        int dotIndex = filename.lastIndexOf('.');
        if (dotIndex < 0 || dotIndex >= filename.length() - 1) {
            throw new FileStorageException("File must have an extension");
        }
        return filename.substring(dotIndex + 1);
    }
}
