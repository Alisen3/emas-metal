package com.emasmetal.backend.service;

import com.emasmetal.backend.exception.FileStorageException;
import com.emasmetal.backend.exception.InvalidFileException;
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
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${file.allowed-contact-extensions}")
    private String allowedContactExtensions;

    @Value("${file.allowed-gallery-extensions}")
    private String allowedGalleryExtensions;

    @Value("${file.max-contact-size}")
    private long maxContactSize;

    @Value("${file.max-gallery-size}")
    private long maxGallerySize;

    private Path uploadPath;
    private Path contactPath;
    private Path galleryPath;

    @PostConstruct
    public void init() {
        try {
            uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            contactPath = uploadPath.resolve("contact");
            galleryPath = uploadPath.resolve("gallery");

            Files.createDirectories(contactPath);
            Files.createDirectories(galleryPath);

            log.info("File storage initialized at: {}", uploadPath);
        } catch (IOException e) {
            throw new FileStorageException("Could not create upload directories", e);
        }
    }

    public String storeContactFile(MultipartFile file) {
        validateFile(file, getContactAllowedExtensions(), maxContactSize, "contact");
        return storeFile(file, contactPath, "contact");
    }

    public String storeGalleryFile(MultipartFile file) {
        validateFile(file, getGalleryAllowedExtensions(), maxGallerySize, "gallery");
        return storeFile(file, galleryPath, "gallery");
    }

    private String storeFile(MultipartFile file, Path targetPath, String type) {
        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
        String extension = getFileExtension(originalFilename);
        String uniqueFilename = UUID.randomUUID().toString() + "." + extension;

        try {
            // Security check: prevent path traversal
            Path targetLocation = targetPath.resolve(uniqueFilename);
            if (!targetLocation.getParent().equals(targetPath)) {
                throw new FileStorageException("Cannot store file outside designated directory");
            }

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, targetLocation, StandardCopyOption.REPLACE_EXISTING);
            }

            log.info("Stored {} file: {}", type, uniqueFilename);
            return "/uploads/" + type + "/" + uniqueFilename;

        } catch (IOException e) {
            throw new FileStorageException("Failed to store file: " + originalFilename, e);
        }
    }

    public void deleteFile(String fileUrl) {
        if (fileUrl == null || fileUrl.isEmpty()) {
            return;
        }

        try {
            // Extract the relative path from the URL
            String relativePath = fileUrl.replace("/uploads/", "");
            Path filePath = uploadPath.resolve(relativePath).normalize();

            // Security check: ensure file is within upload directory
            if (!filePath.startsWith(uploadPath)) {
                log.warn("Attempted to delete file outside upload directory: {}", fileUrl);
                return;
            }

            if (Files.exists(filePath)) {
                Files.delete(filePath);
                log.info("Deleted file: {}", fileUrl);
            }
        } catch (IOException e) {
            log.error("Failed to delete file: {}", fileUrl, e);
        }
    }

    private void validateFile(MultipartFile file, Set<String> allowedExtensions, long maxSize, String type) {
        if (file == null || file.isEmpty()) {
            throw new InvalidFileException("File is empty");
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isEmpty()) {
            throw new InvalidFileException("Invalid filename");
        }

        // Check file size
        if (file.getSize() > maxSize) {
            throw new InvalidFileException(
                    String.format("File size exceeds maximum allowed size of %d MB for %s files",
                            maxSize / (1024 * 1024), type));
        }

        // Check extension
        String extension = getFileExtension(originalFilename).toLowerCase();
        if (!allowedExtensions.contains(extension)) {
            throw new InvalidFileException(
                    String.format("File type '%s' is not allowed for %s. Allowed types: %s",
                            extension, type, String.join(", ", allowedExtensions)));
        }

        // Basic content type validation
        String contentType = file.getContentType();
        if (contentType == null || !isValidContentType(contentType, extension)) {
            throw new InvalidFileException("File content type does not match extension");
        }
    }

    private boolean isValidContentType(String contentType, String extension) {
        return switch (extension.toLowerCase()) {
            case "pdf" -> contentType.equals("application/pdf");
            case "png" -> contentType.equals("image/png");
            case "jpg", "jpeg" -> contentType.equals("image/jpeg");
            case "webp" -> contentType.equals("image/webp");
            case "dwg" -> contentType.equals("application/acad") ||
                    contentType.equals("application/x-acad") ||
                    contentType.equals("application/octet-stream");
            case "dxf" -> contentType.equals("application/dxf") ||
                    contentType.equals("image/vnd.dxf") ||
                    contentType.equals("application/octet-stream");
            case "step", "stp" -> contentType.equals("application/step") ||
                    contentType.equals("application/octet-stream");
            default -> false;
        };
    }

    private String getFileExtension(String filename) {
        int dotIndex = filename.lastIndexOf('.');
        if (dotIndex < 0) {
            return "";
        }
        return filename.substring(dotIndex + 1);
    }

    private Set<String> getContactAllowedExtensions() {
        return Arrays.stream(allowedContactExtensions.split(","))
                .map(String::trim)
                .map(String::toLowerCase)
                .collect(Collectors.toSet());
    }

    private Set<String> getGalleryAllowedExtensions() {
        return Arrays.stream(allowedGalleryExtensions.split(","))
                .map(String::trim)
                .map(String::toLowerCase)
                .collect(Collectors.toSet());
    }
}
